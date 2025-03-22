import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as dat from "dat.gui";

const modelUrl = new URL("./Donkey.gltf", import.meta.url);

const renderer = new THREE.WebGLRenderer({ antialias: true });
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

const ambientLight = new THREE.AmbientLight(0xededed, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff);
scene.add(directionalLight);
directionalLight.position.set(-30, 30, 0);
directionalLight.castShadow = true;

const gui = new dat.GUI();
const options = {
	Main: 0x787a79,
	"Main light": 0xb9b9b9,
	"Main dark": 0x383838,
	Hooves: 0x46423c,
	Hair: 0x383838,
	Muzzle: 0x3d3426,
	"Eye dark": 0x181818,
	"Eye white": 0xe0e0e0,
};

const assetLoader = new GLTFLoader();
assetLoader.load(
	modelUrl.href,
	(gltf) => {
		const model = gltf.scene;
		model.castShadow = true
		scene.add(model);

		gui.addColor(options, "Main").onChange((e) => {
			const m = model.getObjectByName("Cube");
			if (m instanceof THREE.Mesh) m.material?.color.setHex(e);
		});

		gui.addColor(options, 'Main light').onChange((e) => {
			const m = model.getObjectByName("Cube_1");
			if (m instanceof THREE.Mesh) m.material?.color.setHex(e);
		});

		gui.addColor(options, 'Main dark').onChange((e) => {
			const m = model.getObjectByName("Cube_2");
			if (m instanceof THREE.Mesh) m.material?.color.setHex(e);
		});

		gui.addColor(options, 'Hooves').onChange((e) => {
			const m = model.getObjectByName("Cube_3");
			if (m instanceof THREE.Mesh) m.material?.color.setHex(e);
		});

		gui.addColor(options, 'Hair').onChange((e) => {
			const m = model.getObjectByName("Cube_4");
			if (m instanceof THREE.Mesh) m.material?.color.setHex(e);
		});

		gui.addColor(options, 'Muzzle').onChange((e) => {
			const m = model.getObjectByName("Cube_5");
			if (m instanceof THREE.Mesh) m.material?.color.setHex(e);
		});

		gui.addColor(options, 'Eye dark').onChange((e) => {
			const m = model.getObjectByName("Cube_6");
			if (m instanceof THREE.Mesh) m.material?.color.setHex(e);
		});

		gui.addColor(options, 'Eye white').onChange((e) => {
			const m = model.getObjectByName("Cube_7");
			if (m instanceof THREE.Mesh) m.material?.color.setHex(e);
		});
	},
	undefined,
	(error) => {
		console.log(error);
	},
);

const animate = (time: number) => {
	renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

const handleResize = () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", handleResize);
