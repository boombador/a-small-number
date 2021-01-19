import React, { useRef } from 'react';
import { MeshProps } from 'react-three-fiber';
import type { Mesh } from 'three';
import { positionArgsFromCoords, Encampment } from 'src/game';

const EncampmentComponent: React.FC<MeshProps & Encampment> = (props) => {
  const mesh = useRef<Mesh>(); // This reference will give us direct access to the mesh
  return (
    <mesh {...props} {...positionArgsFromCoords(props.coords)} ref={mesh} scale={[1, 1, 1]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  );
};

export default EncampmentComponent;
