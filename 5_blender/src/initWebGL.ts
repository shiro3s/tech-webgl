import { Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { createRenderer, renderScene } from "./renderer";
import { initStats } from "./stats";
import { createCamera, createSpotLight, createAmbientLight } from "./materials";

export const initWebGL = () => {
	const { stats } = initStats();
	const scene = new Scene();

	const { camera } = createCamera();
	scene.add(camera);

	const loader = new GLTFLoader();
	const modelUrl = "./wine.glb";

	loader.load(
		modelUrl,
		(gltf) => {
			gltf.scene.name = "blender";
			scene.add(gltf.scene);
		},
		(xhr) => {
			console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
		},
		(error) => {
			console.error(error);
		},
	);

	const { renderer } = createRenderer();
	renderer.shadowMap.enabled = true;

	const canvas = document.getElementById("canvas");

	const { ambientLight } = createAmbientLight();
	scene.add(ambientLight);

	const { spotLight } = createSpotLight();
	scene.add(spotLight);

	if (!canvas) return;
	canvas.appendChild(renderer.domElement);

	const { render } = renderScene({
		renderer,
		camera,
		scene,
		stats,
	});

	return {
		camera,
		renderer,
		render,
	};
};
