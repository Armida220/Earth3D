import * as THREE from 'three';
//es6
import textureURL from './images/world.jpg'


let camera,scene,renderer;
let geometry,material,mesh;
let uniforms;

init();
animate();
function init(){
    let width=window.innerWidth;
    let height=window.innerHeight;
    camera=new THREE.PerspectiveCamera(70,width/height,1,1000);
    camera.position.z=100;

    scene=new THREE.Scene();

    geometry=new THREE.SphereGeometry(50,50,50);

    //普通贴图材质
    material=new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(textureURL)
    })
    //高级着色器材质定义
    uniforms={
        time:{
            type:'f',
            value:1.0
        },
        texture:{
            type:'t',
            value:new THREE.TextureLoader().load(textureURL)
        }
    }
    let shaderMaterial=new THREE.ShaderMaterial({
        uniforms:uniforms,
        vertexShader:document.getElementById('vertexShader').textContent,
        fragmentShader:document.getElementById('fragmentShader').textContent
    })

    mesh=new THREE.Mesh(geometry,shaderMaterial);

    scene.add(mesh);

    renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});

    renderer.setSize(width,height);
    renderer.setClearColor(0xaaccff);
    document.body.appendChild(renderer.domElement);
    window.addEventListener( 'resize', onWindowResize, false );
}
function render(){
    uniforms.time.value+=0.05;
    renderer.render(scene,camera)
    mesh.rotation.y+=0.02;
}
function animate(){
    requestAnimationFrame(animate)
    render();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}