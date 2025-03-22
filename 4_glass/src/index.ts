import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {EXRLoader} from "three/examples/jsm/loaders/EXRLoader"

const exrTextureURL = new URL("./sunset_puresky.exr", import.meta.url)

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

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.8;

const loader = new EXRLoader()
loader.load(exrTextureURL.href, (texture) => {
	texture.mapping = THREE.EquirectangularReflectionMapping;
	scene.background = texture
	scene.environment = texture;

	const sphere = new THREE.Mesh(
		new THREE.SphereGeometry(1, 50, 50),
		new THREE.MeshPhysicalMaterial({
			roughness: 0,
			metalness: 0,
			transmission: 1,
			ior: 2.33
		})
	)

	scene.add(sphere)
})

// const gridHelper = new THREE.GridHelper(30);
// scene.add(gridHelper);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff);
scene.add(directionalLight);
directionalLight.position.set(-30, 30, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

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
