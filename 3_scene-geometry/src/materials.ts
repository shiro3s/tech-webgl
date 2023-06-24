import {
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  SphereGeometry,
  SpotLight,
  AmbientLight,
} from 'three';

export const createCamera = () => {
  const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // position and point the camera to the center of the scene
  camera.position.x = -50;
  camera.position.y = 30;
  camera.position.z = 20;

  return { camera };
};

export const createCube = () => {
  const cubeGeometry = new BoxGeometry(4, 4, 4);
  const cubeMaterial = new MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });
  const cube = new Mesh(cubeGeometry, cubeMaterial);

  // position the cube
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;

  return { cube };
};

export const createPlane = () => {
  const planeGeometry = new PlaneGeometry(60, 40, 1, 1);
  const planeMaterial = new MeshBasicMaterial({ color: 0xcccccc });
  const plane = new Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  return { plane };
};

export const createSphere = () => {
  const sphereGeometry = new SphereGeometry(4, 20, 20);
  const sphereMaterial = new MeshBasicMaterial({
    color: 0x7777ff,
    wireframe: true,
  });
  const sphere = new Mesh(sphereGeometry, sphereMaterial);

  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;

  return { sphere };
};

export const createSpotLight = () => {
  const spotLight = new SpotLight(0xffffff);
  spotLight.position.set(-40, 40, 50);
  spotLight.castShadow = true;

  return { spotLight };
};

export const createAmbientLight = () => {
  const ambientLight = new AmbientLight();
  return { ambientLight };
};
