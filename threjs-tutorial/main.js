import './style.css'
import * as THREE from 'three'
// Orbit Control
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

//1
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//2
const scene = new THREE.Scene();

//3
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//Orbit Control (optional)
const orbit = new OrbitControls(camera, renderer.domElement)

camera.position.set(-10, 30, 30);
// Very importaint!!!
orbit.update()



//AxesHelper (optional)
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper);

//5
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0x00FF00
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
//Adding object to scene
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI

const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000FF,
  
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere);

sphere.position.set(-10, 10, 0);

//6
// simple animation 
// function animate() {
//   box.rotation.x += 0.01;
//   box.rotation.y += 0.01;

//   //4
// renderer.render(scene, camera);
// }


//6
// Clock animation
function animate(time) {
  box.rotation.x = time / 10000;
  box.rotation.y = time / 10000;
  //4
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


