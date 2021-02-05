// mainly used for debugging or fallback rendering
import React, { useRef } from 'react';
import { MeshProps } from 'react-three-fiber';
import type { Mesh } from 'three';

const Cube: React.FC<MeshProps & { color?: string }> = (props) => {
  const mesh = useRef<Mesh>(); // This reference will give us direct access to the mesh
  return (
    <mesh {...props} ref={mesh} scale={[1, 1, 1]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color || 'magenta'} />
    </mesh>
  );
};

export default Cube;
