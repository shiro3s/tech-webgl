import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
	color: 0xffffff,
	side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
	color: 0x0000ff,
	wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff);
scene.add(directionalLight);
directionalLight.position.set(-30, 30, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(
	directionalLight.shadow.camera,
);
scene.add(dLightShadowHelper);

scene.fog = new THREE.FogExp2(0xffffff, 0.01);

// renderer.setClearColor(0xFFEA00)

const gui = new dat.GUI();
const options = {
	sphereColor: "#ffea00",
	wireframe: false,
	speed: 0.01,
	angle: 0.2,
	penumbra: 0,
	intensity: 1,
};

gui.addColor(options, "sphereColor").onChange((e) => {
	sphere.material.color.set(e);
});

gui.add(options, "wireframe").onChange((e) => {
	sphere.material.wireframe = e;
});

gui.add(options, "speed", 0, 0.01);

let step = 0;

const animate = (time: number) => {
	box.rotation.x += 0.01;
	box.rotation.y += 0.01;

	step += options.speed;
	sphere.position.y = 10 * Math.abs(Math.sin(step));
	renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
