import {
	WebGLRenderer,
	Color,
	type Scene,
	type Mesh,
	type SphereGeometry,
	type PerspectiveCamera,
	type MeshBasicMaterial,
} from "three";
import type Stats from "stats.js";
import type { Control } from "./dat.gui";

export const createRenderer = () => {
	const renderer = new WebGLRenderer();
	renderer.setClearColor(new Color(0xeeeeee));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;

	return { renderer };
};

interface ResizeArgs {
	camera: PerspectiveCamera;
	renderer: WebGLRenderer;
}

export const resizeRenderer = ({ camera, renderer }: ResizeArgs) => {
	const resize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	};

	return { resize };
};

interface RenderArgs {
	stats: Stats;
	renderer: WebGLRenderer;
	scene: Scene;
	camera: PerspectiveCamera;
	sphere: Mesh<SphereGeometry, MeshBasicMaterial>;
	controls: Control;
}

export const renderScene = ({
	renderer,
	camera,
	scene,
	stats,
	sphere,
	controls,
}: RenderArgs) => {
	let step = 0;

	const renderAnimation = () => {
		stats.update();

		step += controls.bouncingSpeed;

		sphere.position.x = 20 + 10 * Math.cos(step);
		sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

		requestAnimationFrame(renderAnimation);
		renderer.render(scene, camera);
	};

	return {
		renderAnimation,
	};
};
