import { WebGLRenderer, Color, Scene, PerspectiveCamera } from 'three';
import Stats from 'stats.js';

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
}

export const renderScene = ({ renderer, camera, scene, stats }: RenderArgs) => {
  // let step = 0;
  const render = () => {
    stats.update();

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };

  return {
    render,
  };
};
