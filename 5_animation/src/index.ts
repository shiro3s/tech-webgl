import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

const tl = gsap.timeline()
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

camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0)
orbit.update();

const plane = new THREE.Mesh(
	new THREE.PlaneGeometry(30, 30),
	new THREE.MeshStandardMaterial({color: "#ffffff", side: THREE.DoubleSide})
)
plane.receiveShadow = true
plane.rotateX(-Math.PI / 2)
scene.add(plane)


const box = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshStandardMaterial({
		color: "#ffe4c4", 
		metalness: 0, 
	})
)
box.position.y = 0.5
box.castShadow = true
scene.add(box)

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);



const ambientLight = new THREE.AmbientLight("#ffffff");
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

const handleMouseDown = () => {
	tl.to(camera.position, {
		z: 14,
		duration: 1.5,
		onUpdate: () => {
			camera.lookAt(0, 0, 0)
		}
	})
	.to(camera.position, {
		y: 10,
		duration: 1.5,
		onUpdate: () => {
			camera.lookAt(0, 0, 0)
		}
	})
	.to(camera.position, {
		x: 10,
		y: 5,
		z: 3,
		duration: 1.5,
		onUpdate: () => {
			camera.lookAt(0, 0, 0)
		}
	})
}

window.addEventListener("mousedown", handleMouseDown)