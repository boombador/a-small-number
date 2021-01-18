import React, { useRef } from 'react';
import { MeshProps } from 'react-three-fiber';
import type { Mesh } from 'three';
import type { GameCoords, Vec3Array, ResourceMap } from 'src/game';

export const coordsToPosition = ([x, y]: GameCoords): Vec3Array => {
  return [x, y, 0.5];
};

export const positionToCoords = (pos: Vec3Array): GameCoords => {
  return [pos[0], pos[1]];
};

export type EncampmentProps = {
  coords?: GameCoords;
  resources?: ResourceMap;
};

const Encampment: React.FC<MeshProps & EncampmentProps> = (props) => {
  const mesh = useRef<Mesh>(); // This reference will give us direct access to the mesh
  const positionArgs = props.coords ? { position: coordsToPosition(props.coords) } : {};

  return (
    <mesh {...props} {...positionArgs} ref={mesh} scale={[1, 1, 1]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
};

export default Encampment;
