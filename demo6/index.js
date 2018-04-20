import echarts from 'echarts';
import 'echarts-gl';
import baseTexture from './images/earth.jpg';
import clouds from './images/clouds.png';
import heightTexture from './images/heightTexture.jpg'
import axios from 'axios';

axios.get('http://localhost:1234/world.json').then((res) => {
    //注册geojson
    echarts.registerMap('world', res.data);
    //创建canvas贴图
    let canvas = document.createElement('canvas');
    let mapChart = echarts.init(canvas, null, {
        width: 2048,
        height: 1024
    });
    mapChart.setOption({
        geo: {
            type: 'map',
            map: 'world',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            boundingCoords: [[-180, 90], [180, -90]],
            itemStyle: {
                normal: {
                    areaColor: 'transparent',
                    borderColor: '#121212'
                },
                emphasis: {
                    areaColor: 'yellow'
                }
            },
            label: {
                show: false,
                fontSize:2
            },
            selectedMode:'single'
        }
    });
    console.log(mapChart)
    let earth = echarts.init(document.getElementById('container'));
    let option = {
        backgroundColor: '#000',
        globe: {
            //基本贴图
            baseTexture: baseTexture,
            //高度纹理贴图
            heightTexture: heightTexture,
            //地球顶点位移的大小
            displacementScale: 0.01,
            //地球顶点位移的质量
            displacementQuality: 'high',
            //使用渐变色作为环境色
            environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: '#00aaff' // 天空颜色
            }, {
                offset: 0.7, color: '#998866' // 地面颜色
            }, {
                offset: 1, color: '#998866' // 地面颜色
            }], false),
            //地球中三维图形的着色效果
            shading: 'lambert',//color,lambert,realistic
            light: {
                ambient: {
                    intensity: 0.6
                },
                main: {
                    intensity: 1.0
                }
            },

            layers: [
                //type不能为blend，是bug
                {
                    type: 'overlay',
                    texture: mapChart,
                    shading: 'lambert',
                    distance: 0
                },
                //上面的层会挡住下面的层导致无法选中
                // {
                //     type: 'overlay',
                //     texture: clouds,
                //     shading: 'lambert',
                //     distance: 10
                // },
            ],
        },
        // geo3D:{
        //     itemStyle:{
        //         borderWidth:2
        //     }
        // },
        series: [
            
        ]
    }
    earth.setOption(option);
   
})
