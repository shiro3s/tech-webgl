import { initWebGL } from "./initWebGL";
import { resizeRenderer } from "./renderer";

const init = initWebGL();

if (init) {
	const { resize } = resizeRenderer({ ...init });

	window.onload = init.renderAnimation;
	window.addEventListener("resize", resize, false);
}
