import { PerspectiveCamera, SpotLight, AmbientLight } from "three";

export const createCamera = () => {
	const camera = new PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		0.1,
		1000,
	);

	// position and point the camera to the center of the scene
	camera.position.x = -20;
	camera.position.y = 25;
	camera.position.z = 20;

	return { camera };
};

export const createSpotLight = () => {
	const spotLight = new SpotLight(0xffffff);
	spotLight.position.set(-40, 60, 10);
	spotLight.castShadow = true;

	return { spotLight };
};

export const createAmbientLight = () => {
	const ambientLight = new AmbientLight();
	return { ambientLight };
};
