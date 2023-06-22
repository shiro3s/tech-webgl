import { Scene, AxesHelper } from 'three';

import { createRenderer, renderScene } from './renderer';
import { initStats } from './stats';
import { guiControl } from './dat.gui';
import {
  createCamera,
  createPlane,
  createSpotLight,
  createAmbientLight,
} from './materials';

export const initWebGL = () => {
  const { stats } = initStats();
  const scene = new Scene();

  const { camera } = createCamera();
  scene.add(camera);

  camera.lookAt(scene.position);

  const { renderer } = createRenderer();

  const canvas = document.getElementById('canvas');

  // x, y, z軸を表示
  const axes = new AxesHelper(50);
  scene.add(axes);

  const { plane } = createPlane();
  scene.add(plane);

  const { ambientLight } = createAmbientLight();
  scene.add(ambientLight);

  const { spotLight } = createSpotLight();
  scene.add(spotLight);

  if (!canvas) return;
  canvas.appendChild(renderer.domElement);

  const { controls } = guiControl({ scene, plane });

  const { render } = renderScene({
    renderer,
    camera,
    scene,
    stats,
    controls,
    plane,
  });

  return {
    camera,
    renderer,
    render,
  };
};
