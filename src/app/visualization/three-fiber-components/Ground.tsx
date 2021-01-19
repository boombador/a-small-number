import React, { useRef } from 'react';
import type { Mesh } from 'three';
import { DoubleSide } from 'three';

const Ground: React.FunctionComponent = () => {
  const mesh = useRef<Mesh>();
  const shadeBothSides = false;
  const renderOpts = shadeBothSides
    ? {
        side: DoubleSide,
      }
    : {};
  return (
    <mesh ref={mesh} scale={[1, 1, 1]}>
      <planeBufferGeometry args={[1024, 1024, 1]} />
      <meshStandardMaterial color={'green'} {...renderOpts} />
    </mesh>
  );
};

export default Ground;
