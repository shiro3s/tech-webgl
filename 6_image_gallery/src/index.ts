import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;

renderer.setClearColor(0xFFFFFF)

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 5)

const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

camera.position.set(-5, 30, 25);
camera.scale.set(0.3, 0.5, 1.5);
orbit.update();

const gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff);
scene.add(directionalLight);
directionalLight.position.set(-30, 30, 0);
directionalLight.castShadow = true;

for (let i = 0; i < 49; i++) {
	new THREE.TextureLoader().load(`/img/${i + 1}.jpg`, (texture) => {
		const planeMesh = new THREE.Mesh(
			new THREE.PlaneGeometry(4, 4),
			new THREE.MeshBasicMaterial({map: texture})
		)

		planeMesh.rotateX(-Math.PI / 2)

		planeMesh.position.x = ((i % 7) * 5) - 5
		planeMesh.position.z = (-(Math.floor(i / 7) % 7) * 5) + 5

		scene.add(planeMesh)
	}, undefined, (error) => {
		console.log(error)
	})
}


console.log(scene.children)

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(
	directionalLight.shadow.camera,
);
scene.add(dLightShadowHelper);


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
