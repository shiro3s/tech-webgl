import {
  BoxGeometry,
  CylinderGeometry,
  IcosahedronGeometry,
  // LatheGeometry,
  MeshBasicMaterial,
  MeshLambertMaterial,
  OctahedronGeometry,
  Scene,
  SphereGeometry,
  TetrahedronGeometry,
  TorusGeometry,
  TorusKnotGeometry,
  Vector3,
} from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries';
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils';

export const addGeometries = (scene: Scene) => {
  const geoms = [];

  geoms.push(new CylinderGeometry(1, 4, 4));

  // basic cube
  geoms.push(new BoxGeometry(2, 2, 2));

  // basic sphere
  geoms.push(new SphereGeometry(2));

  //
  geoms.push(new IcosahedronGeometry(4));

  const points = [
    new Vector3(2, 2, 2),
    new Vector3(2, 2, -2),
    new Vector3(-2, 2, -2),
    new Vector3(-2, 2, 2),
    new Vector3(2, -2, 2),
    new Vector3(2, -2, -2),
    new Vector3(-2, -2, -2),
    new Vector3(-2, -2, 2),
  ];
  geoms.push(new ConvexGeometry(points));

  // const pts: Vector3[] = [];
  // const detail = 0.1;
  // const radius = 3;

  // for (let angle = 0.0; angle < Math.PI; angle += detail) {
  //   pts.push(
  //     new Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
  //   );
  // }

  // geoms.push(new LatheGeometry(pts, 12));

  geoms.push(new OctahedronGeometry(3));

  geoms.push(new ParametricGeometry(ParametricGeometries.mobius3d, 20, 10));

  geoms.push(new TetrahedronGeometry(3));

  geoms.push(new TorusGeometry(3, 1, 10, 10));

  geoms.push(new TorusKnotGeometry(3, 0.5, 50, 20));

  let j = 0;
  for (let i = 0; i < geoms.length; i++) {
    // const cubeMaterial = new MeshLambertMaterial({
    //   wireframe: true,
    //   color: Math.random() * 0xffffff,
    // });

    const materials = [
      new MeshLambertMaterial({
        color: Math.random() * 0xffffff,
        flatShading: true,
      }),
      new MeshBasicMaterial({ color: 0x000000, wireframe: true }),
    ];

    const mesh = createMultiMaterialObject(geoms[i], materials);
    mesh.traverse((e) => (e.castShadow = true));
    mesh.position.x = -24 + (i % 4) * 12;
    mesh.position.y = 4;
    mesh.position.z = -8 + j * 12;

    if ((i + 1) % 4 === 0) j++;
    scene.add(mesh);
  }
};
