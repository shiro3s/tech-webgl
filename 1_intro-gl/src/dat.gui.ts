import * as dat from "dat.gui";

export class Control {
	rotationSpeed = 0.02;
	bouncingSpeed = 0.03;
}

export const guiControl = () => {
	const gui = new dat.GUI();

	const controls = new Control();
	gui.add(controls, "bouncingSpeed", 0, 0.5);

	return { controls };
};
