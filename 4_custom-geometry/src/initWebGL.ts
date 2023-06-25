import { Scene, AxesHelper, Vector3 } from 'three';

import { createRenderer, renderScene } from './renderer';
import { initStats } from './stats';
import {
  createCamera,
  createPlane,
  createSpotLight,
  // createAmbientLight,
} from './materials';
import { addGeometries } from './addGeometries';

export const initWebGL = () => {
  const { stats } = initStats();
  const scene = new Scene();

  // シーンにフォグを追加
  // scene.fog = new Fog(0xffffff, 0.015, 100);

  const { camera } = createCamera();
  scene.add(camera);

  camera.lookAt(new Vector3(5, 0, 0));

  const { renderer } = createRenderer();
  renderer.shadowMap.enabled = true;

  const canvas = document.getElementById('canvas');

  // x, y, z軸を表示
  // X is red
  // Y is green
  // Z is blue
  const axes = new AxesHelper(10);
  scene.add(axes);

  const { plane } = createPlane();
  scene.add(plane);

  // const { ambientLight } = createAmbientLight();
  // scene.add(ambientLight);

  const { spotLight } = createSpotLight();
  scene.add(spotLight);

  if (!canvas) return;
  canvas.appendChild(renderer.domElement);

  const { mesh } = addGeometries();
  scene.add(mesh);

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
