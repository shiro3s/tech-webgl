import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#FFFFFF")

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);
camera.position.z = 50;

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
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

const points: THREE.Vector3[] = [];
for (let i = 0; i < 5; i += 1) {
	const p = new THREE.Vector3(0, 0, 2.5 * (i / 4))
	points.push(p)
}
const curve = new THREE.CatmullRomCurve3(points)

const tubeMesh = new THREE.Mesh(
	new THREE.TubeGeometry(curve, 70, 0.02, 50),
	new THREE.MeshStandardMaterial({
		side: THREE.BackSide,
		wireframe: true
	})
)
tubeMesh.scale.set(30, 30, 30)
scene.add(tubeMesh)

const animate = (time: number) => {
	camera.position.z -= 0.04
	if (camera.position.z < 20) camera.position.z = 50
	renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

const handleResize = () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", handleResize);
