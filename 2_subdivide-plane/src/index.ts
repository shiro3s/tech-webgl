import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { nanoid } from "nanoid";

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

const planeMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(20, 20),
	new THREE.MeshBasicMaterial({
		side: THREE.DoubleSide,
		visible: false,
	}),
);
planeMesh.rotateX(-Math.PI / 2);
planeMesh.name = "ground";
scene.add(planeMesh);

const gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);

const highlightMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(1, 1),
	new THREE.MeshBasicMaterial({
		side: THREE.DoubleSide,
	}),
);
highlightMesh.rotateX(-Math.PI / 2);
highlightMesh.position.set(0.5, 0, 0.5);
scene.add(highlightMesh);

const mousePosition = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

let intersects: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[] =
	[];

const handleMouseMove = (e: MouseEvent) => {
	mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
	mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(mousePosition, camera);

	// biome-ignore lint:
	const sceneChildren = scene.children;
	// console.log(sceneChildren)
	intersects = raycaster.intersectObject(sceneChildren[1]);
	intersects.forEach((intersect) => {
		if (intersect.object.name === "ground") {
			const highlightPos = new THREE.Vector3()
				.copy(intersect.point)
				.floor()
				.addScalar(0.5);
			highlightMesh.position.set(highlightPos.x, 0, highlightPos.z);
		}
	});
};

let objects: THREE.Mesh<
	THREE.PlaneGeometry,
	THREE.MeshBasicMaterial,
	THREE.Object3DEventMap
>[] = [];

const handleClick = () => {
	if (!intersects.length) return;

	const highlightMeshClone = highlightMesh.clone();
	highlightMeshClone.position.copy(highlightMesh.position);
	const objectExist = objects.find((obj) => {
		return (
			obj.position.x === highlightMeshClone.position.x &&
			obj.position.z === highlightMeshClone.position.z
		);
	});

	if (objectExist) {
		scene.remove(objectExist);
		objects = objects.filter((object) => {
			return !(
				object.position.x === objectExist.position.x &&
				object.position.z === objectExist.position.z
			);
		});
	} else {
		scene.add(highlightMeshClone);
		objects.push(highlightMeshClone);
	}
};

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
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("click", handleClick);
