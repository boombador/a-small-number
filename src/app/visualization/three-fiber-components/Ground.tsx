import React, { useRef } from 'react';
import type { Mesh } from 'three';

const Ground: React.FunctionComponent = () => {
  const mesh = useRef<Mesh>();
  return (
    <mesh ref={mesh} scale={[1, 1, 1]}>
      <planeBufferGeometry args={[1024, 1024, 1]} />
      <meshStandardMaterial color={'green'} />
    </mesh>
  );
};

export default Ground;
