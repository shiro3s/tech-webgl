import { Scene, AxesHelper } from 'three';

import { createRenderer, renderScene } from './renderer';
import { initStats } from './stats';
import { guiControl } from './dat.gui';
import {
  createCamera,
  createCube,
  createPlane,
  createSphere,
  createSpotLight,
} from './materials';

export const initWebGL = () => {
  const { stats } = initStats();
  const scene = new Scene();
  const { camera } = createCamera();

  camera.lookAt(scene.position);

  const { renderer } = createRenderer();

  const canvas = document.getElementById('canvas');

  // x, y, z軸を表示
  const axes = new AxesHelper(20);
  scene.add(axes);

  const { plane } = createPlane();
  scene.add(plane);

  const { cube } = createCube();
  scene.add(cube);

  const { sphere } = createSphere();
  scene.add(sphere);

  const { spotLight } = createSpotLight();
  scene.add(spotLight);

  if (!canvas) return;
  canvas.appendChild(renderer.domElement);

  const { controls } = guiControl();

  const { renderAnimation } = renderScene({
    renderer,
    camera,
    scene,
    stats,
    sphere,
    controls,
  });

  return {
    camera,
    renderer,
    renderAnimation,
  };
};
