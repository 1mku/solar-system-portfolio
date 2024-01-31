import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from 'tweakpane';

// initialize the scene
const scene = new THREE.Scene();



// add objects to the scene
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// const vertices = new Float32Array([
//   0, 0, 0,
//   0, 1, 0,
//   1, 0, 0,
// ])

// Pane
const PARAMS = {
  width: 1,
  height: 1,
  widthSegments: 4,
  heightSegments: 4
};

const pane = new Pane();

pane.addBinding(PARAMS, 'width', { min: 1, max: 10, step: 0.1 });
pane.addBinding(PARAMS, 'height', { min: 1, max: 10, step: 0.1 });
pane.addBinding(PARAMS, 'widthSegments', { min: 1, max: 10, step: 0.1 });
pane.addBinding(PARAMS, 'heightSegments', { min: 1, max: 10, step: 0.1 });

let geometry = new THREE.PlaneGeometry(PARAMS.width, PARAMS.height, PARAMS.widthSegments, PARAMS.heightSegments);
// const bufferAttribute = new THREE.BufferAttribute(vertices, 3);
// geometry.setAttribute('position', bufferAttribute);

const material = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
// const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);


pane.on('change', () => {
  geometry = new THREE.PlaneGeometry(PARAMS.width, PARAMS.height, PARAMS.widthSegments, PARAMS.heightSegments);
  mesh.geometry = geometry;
})


scene.add(mesh);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();