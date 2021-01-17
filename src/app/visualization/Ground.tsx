import React, { useRef } from 'react';
import type { Mesh } from 'three';
import { DoubleSide } from 'three';

const Ground: React.FunctionComponent = () => {
  const mesh = useRef<Mesh>();
  return (
    <mesh ref={mesh} scale={[1, 1, 1]}>
      <planeBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'green'} side={DoubleSide} />
    </mesh>
  );
};

export default Ground;
