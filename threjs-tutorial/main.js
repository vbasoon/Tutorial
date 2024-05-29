import './style.css'
import * as THREE from 'three'
// Orbit Control
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as dat from 'dat.gui'

import nebula from './src/images/nebula.jpg'
import stars from '/stars.jpg'

//1
const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

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

// For ambientLight you need to change on MeshStandardMaterial
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
//Adding object to scene
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper);

// For directionalLight you need to change on MeshStandardMaterial
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000FF,
  
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;

// For ambientLight you need to change on StandardMaterial
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight)


//DirectionalLight
// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
// scene.add(directionalLight)
// directionalLight.position.set(-30, 50, 0);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
// scene.add(dLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper)

//SpotLight
const spotLight = new THREE.SpotLight(0xFFFFFF, 500);
scene.add(spotLight);
spotLight.position.set(-20, 50, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(sLightHelper)

//scene.fog = new THREE.Fog(0xFFFFFF, 0, 200);
scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01)

// for change textures
// renderer.setClearColor(0xFFEA00)

const textureLoader = new THREE.TextureLoader();
//scene.background = textureLoader.load(stars);
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  stars,
  stars,
  stars,
  stars,
  stars,
  stars
]);

const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
const box2Material = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
const box2 = new THREE.Mesh(box2Geometry, box2Material);
scene.add(box2);
box2.position.set(0, 15, 10);

const gui = new dat.GUI()

const options = {
  sphereColor: '#ffea00',
  wireframe: false,
  speed: 0.01,
  angle: 0.2,
  penumbra: 0,
  intensity: 1,
};

gui.addColor(options, 'sphereColor').onChange((e) => {
  sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange((e) => {
  sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);

gui.add(options, 'angle', 0, 10);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 1000);

let step = 0;
let speed = 0.01;

//6
// Clock animation
function animate(time) {
  box.rotation.x = time / 10000;
  box.rotation.y = time / 10000;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));

  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;
  sLightHelper.update();

  //4
  renderer.render(scene, camera);
}

//6
// simple animation 
// function animate() {
//   box.rotation.x += 0.01;
//   box.rotation.y += 0.01;

//   //4
// renderer.render(scene, camera);
// }

renderer.setAnimationLoop(animate);


