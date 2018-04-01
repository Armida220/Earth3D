import * as THREE from 'three';


let camera,scene,renderer;
let geometry,material,mesh;

init();
animate();
function init(){

}
function render(){
    renderer.render(scene,camera)
}
function animate(){
    requestAnimationFrame(animate)
    render();
}