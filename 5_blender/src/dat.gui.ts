import {
	BoxGeometry,
	Mesh,
	MeshLambertMaterial,
	type Scene,
	type PlaneGeometry,
	type MeshBasicMaterial,
} from "three";
import * as dat from "dat.gui";

export class Control {
	rotationSpeed = 0.02;
	numberOfObjects = 0;
	scene: Scene;
	plane: Mesh<PlaneGeometry, MeshBasicMaterial>;

	constructor(scene: Scene, plane: Mesh<PlaneGeometry, MeshBasicMaterial>) {
		this.numberOfObjects = scene.children.length;
		this.scene = scene;
		this.plane = plane;
	}

	removeCube() {
		const children = this.scene.children;
		const lastObject = children[children.length - 1];
		if (lastObject instanceof Mesh) {
			this.scene.remove(lastObject);
			this.numberOfObjects = this.scene.children.length;
		}
	}

	addCube() {
		const cubeSize = Math.ceil(Math.random() * 3);
		const cubeGeometry = new BoxGeometry(cubeSize, cubeSize, cubeSize);
		const cubeMaterial = new MeshLambertMaterial({
			color: Math.random() * 0xffffff,
		});
		const cube = new Mesh(cubeGeometry, cubeMaterial);

		cube.castShadow = true;
		cube.name = "cube-" + this.scene.children.length;

		cube.position.x =
			-30 + Math.round(Math.random() * this.plane.geometry.parameters.width);
		cube.position.y = Math.round(Math.random() * 5);
		cube.position.z =
			-20 + Math.round(Math.random() * this.plane.geometry.parameters.height);

		this.scene.add(cube);
		this.numberOfObjects = this.scene.children.length;
	}
}

interface Args {
	scene: Scene;
	plane: Mesh<PlaneGeometry, MeshBasicMaterial>;
}

export const guiControl = ({ scene, plane }: Args) => {
	const gui = new dat.GUI();

	const controls = new Control(scene, plane);
	gui.add(controls, "rotationSpeed", 0, 0.5);
	gui.add(controls, "addCube");
	gui.add(controls, "removeCube");
	gui.add(controls, "numberOfObjects").listen();

	return { controls };
};
