import {
	BufferGeometry,
	MeshBasicMaterial,
	BufferAttribute,
	MeshLambertMaterial,
} from "three";
import { createMultiMaterialObject } from "three/examples/jsm/utils/SceneUtils";

export const addGeometries = () => {
	const vertices = new Float32Array([
		// v0
		-1.0, -1.0, 1.0,
		// v1
		1.0, -1.0, 1.0,
		// v2
		1.0, 1.0, 1.0,
		// v3
		-1.0, 1.0, 1.0,
		// v4
		-1.0, 1.0, -1.0,
		// v5
		-1.0, -1.0, -1.0,
		// v6
		1.0, -1.0, -1.0,
		// v7
		1.0, 1.0, -1.0,
	]);

	const indices = [
		3, 2, 1,
		//
		1, 0, 3,
		//
		0, 5, 4,
		//
		4, 3, 0,
		//
		0, 1, 6,
		//
		6, 5, 0,
		//
		2, 3, 7,
		//
		7, 3, 4,
		//
		5, 6, 7,
		//
		7, 4, 5,
		//
		6, 1, 2,
		//
		2, 7, 6,
	];

	const geometry = new BufferGeometry();

	geometry.setIndex(indices);
	// 頂点あたりの数を3として指定
	geometry.setAttribute("position", new BufferAttribute(vertices, 3));

	const material = [
		new MeshLambertMaterial({
			opacity: 0.6,
			color: 0x44ff44,
			transparent: true,
			flatShading: true,
		}),
		new MeshBasicMaterial({
			color: 0x000000,
			wireframe: true,
		}),
	];

	const mesh = createMultiMaterialObject(geometry, material);

	return { mesh };
};
