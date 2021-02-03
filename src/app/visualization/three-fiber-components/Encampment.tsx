import React, { useRef, Suspense } from 'react';
import { MeshProps, useLoader } from 'react-three-fiber';
import type { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { positionArgsFromCoords, Encampment } from 'src/game';
import ErrorBoundary from 'src/utils/ErrorBoundary';

const Cube: React.FC<MeshProps & { color?: string }> = (props) => {
  const mesh = useRef<Mesh>(); // This reference will give us direct access to the mesh
  return (
    <mesh {...props} ref={mesh} scale={[1, 1, 1]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color || 'magenta'} />
    </mesh>
  );
};

const Asset: React.FC<{ url: string }> = ({ url }) => {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} />;
};

const EncampmentComponent: React.FC<MeshProps & Encampment> = (props) => {
  const adjustedProps = { ...props, ...positionArgsFromCoords(props.coords) };
  return (
    <ErrorBoundary isGraphical>
      <Suspense fallback={<Cube {...adjustedProps} color="red" />}>
        <Asset url="models/camp.glb" />
      </Suspense>
    </ErrorBoundary>
  );
};

export default EncampmentComponent;
