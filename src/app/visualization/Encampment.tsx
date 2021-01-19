import React, { useRef } from 'react';
import { MeshProps } from 'react-three-fiber';
import type { Mesh } from 'three';
import { positionArgsFromCoords, GameCoords, ResourceMap } from 'src/game';

export type EncampmentProps = {
  coords?: GameCoords;
  resources?: ResourceMap;
};

const Encampment: React.FC<MeshProps & EncampmentProps> = (props) => {
  const mesh = useRef<Mesh>(); // This reference will give us direct access to the mesh
  return (
    <mesh {...props} {...positionArgsFromCoords(props.coords)} ref={mesh} scale={[1, 1, 1]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  );
};

export default Encampment;
