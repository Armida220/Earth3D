import * as THREE from 'three';


let camera,scene,renderer;
let geometry,material,mesh;

init();
animate();
function init(){
    let width=window.innerWidth;
    let height=window.innerHeight;
    camera=new THREE.PerspectiveCamera(70,width/height,0.01,10);
    camera.position.z=1;

    scene=new THREE.Scene();

    geometry=new THREE.BoxGeometry(0.2,0.2,0.2);

    material=new THREE.MeshNormalMaterial();

    mesh=new THREE.Mesh(geometry,material);

    scene.add(mesh);

    renderer=new THREE.WebGLRenderer({antialias:true});

    renderer.setSize(width,height);

    document.body.appendChild(renderer.domElement);
}
function render(){
    mesh.rotation.x+=0.01;
    mesh.rotation.y+=0.02;
    
    renderer.render(scene,camera)
}
function animate(){
    requestAnimationFrame(animate)
    render();
}