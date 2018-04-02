import * as THREE from 'three';
import chinaData from './china';


let camera, scene, renderer;
let geometry, material, mesh;

init();
animate();
function init() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera.position.z = 200;
    camera.position.x = 10;

    scene = new THREE.Scene();

    //球体半径
    let r=100;
    geometry = new THREE.SphereGeometry(r, 25, 25);

    material = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })

    //
    mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    //粒子几何
    let particleGeometry = new THREE.Geometry();
    //粒子材质
    let particleMaterial=new THREE.PointsMaterial({size:1,color:0xffff00});
    chinaData.map((item,index)=>{
        return {
            x:r*Math.cos(item.lat*Math.PI/180)*Math.cos(item.lng*Math.PI/180),
            y:r*Math.cos(item.lat*Math.PI/180)*Math.sin(item.lng*Math.PI/180),
            z:r*Math.sin(item.lat*Math.PI/180),
        }
    }).forEach((item,index)=>{
        particleGeometry.vertices.push(new THREE.Vector3(item.x,item.y,item.z))
    });

    let points=new THREE.Points(particleGeometry,particleMaterial);

    scene.add(points);
    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(width, height);

    document.body.appendChild(renderer.domElement);

    window.addEventListener( 'resize', onWindowResize, false );
}
function render() {
    scene.rotation.x += 0.01;
    scene.rotation.y += 0.01;
    scene.rotation.z += 0.01;

    renderer.render(scene, camera)
}
function animate() {
    requestAnimationFrame(animate)
    render();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}