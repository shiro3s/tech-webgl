
const init = () => {
	let width = 0;
	let height = 0;

	const canvas = <HTMLCanvasElement>document.getElementById("canvas")
	const context = canvas.getContext("2d");

	if (!context) return;

	const draw = () => {
		context.clearRect(0, 0, width, height);
		context.lineWidth = 10;
		context.beginPath();
		context.strokeStyle = "#fff"

		// 分割数
		// NOTE: 分割数を増やすとなめらかになる
		const segmentNum = 100;
		// 振幅
		const amplitude = height / 3;
		const time = Date.now() / 1000;

		Array.from({length: segmentNum}).forEach((_, i) => {
			// x座標
			const x = (i / (segmentNum - 1)) * width;
			// ラジアン
			const radian = (i / segmentNum) * Math.PI + time
			// y座標
			const y = amplitude * Math.sin(radian) + height / 2;

			if (i === 0) {
				context.moveTo(x, y)
			} else {
				context.lineTo(x, y)
			}
		})
		context.stroke()
	}

	const resize = () => {
		width = window.innerWidth * window.devicePixelRatio;
		height = window.innerHeight * window.devicePixelRatio;

		canvas.width = width
		canvas.height = height
	}

	const tick = () => {
		requestAnimationFrame(tick)
		draw()
	}

	return {
		draw,
		resize,
		tick
	}
}

const f = init();

f?.resize();
f?.tick()
window.addEventListener("resize", () => {
	f?.resize()
})
