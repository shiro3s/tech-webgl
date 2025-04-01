import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;

renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);

const mousePosition = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let intersects: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[] =
	[];

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 5);

const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

camera.position.set(0, 0, 30);
camera.position.z = 30;
camera.lookAt(0, 0, 0);
orbit.update();

const gridHelper = new THREE.GridHelper(41, 41);
gridHelper.rotation.x = THREE.MathUtils.degToRad(90);
scene.add(gridHelper);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff);
scene.add(directionalLight);
directionalLight.position.set(-30, 30, 0);
directionalLight.castShadow = true;

const imageGroupMesh = new THREE.Group();
imageGroupMesh.name = "imageGroup";

for (let i = 0; i < 49; i++) {
	new THREE.TextureLoader().load(
		`/img/${i + 1}.jpg`,
		(texture) => {
			const planeMesh = new THREE.Mesh(
				new THREE.PlaneGeometry(5, 5),
				new THREE.MeshBasicMaterial({ map: texture }),
			);

			planeMesh.position.x = (i % 7) * 6 - 18;
			planeMesh.position.y = -(Math.floor(i / 7) % 7) * 6 + 18;
			planeMesh.name = "image";

			imageGroupMesh.add(planeMesh);
		},
		undefined,
		(error) => {
			console.log(error);
		},
	);
}

scene.add(imageGroupMesh);

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(
	directionalLight.shadow.camera,
);
scene.add(dLightShadowHelper);

// const animationImage = () => {
// }

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

// window.addEventListener("mousedown", animationImage)

const handleMouseDown = (event: MouseEvent) => {
	mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
	mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mousePosition, camera);
	intersects = raycaster.intersectObjects(scene.children);
	intersects.forEach((intersect) => {
		if (intersect.object.name === "image") console.log(intersect);
	});

	tl.to(camera.position, {
		x: -4,
		y: -3,
		z: 17,
		onUpdate: () => {
			camera.lookAt(0, 0, 0)
		}
	})
	.to(imageGroupMesh.position, {
		x: 1,
		y: -1,
	})

	console.log(camera.position);
};

window.addEventListener("mousedown", handleMouseDown);
