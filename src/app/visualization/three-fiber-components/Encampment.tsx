import React, { useRef, useEffect } from 'react';
import { MeshProps } from 'react-three-fiber';
import type { Mesh } from 'three';
import { positionArgsFromCoords, Encampment } from 'src/game';

import { useThree } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const EncampmentComponent: React.FC<MeshProps & Encampment> = (props) => {
  const mesh = useRef<Mesh>(); // This reference will give us direct access to the mesh
  const { scene } = useThree();

  useEffect(() => {
    const loader = new GLTFLoader();
    let gltfHandle: any = null; // not sure what gltf is

    loader.load(
      'models/camp.glb',
      function (gltf) {
        gltfHandle = gltf;
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      },
    );
    return function removeCampFromScene() {
      scene.remove(gltfHandle.scene);
    };
  }, [scene]);

  return (
    <mesh {...props} {...positionArgsFromCoords(props.coords)} ref={mesh} scale={[1, 1, 1]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  );
};

export default EncampmentComponent;
