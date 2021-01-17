import React, { useRef } from 'react';
import { MeshProps } from 'react-three-fiber';
import type { Mesh } from 'three';
import type { GameCoords } from 'src/game';

const coordsToPosition = ([x, y]: GameCoords): [number, number, number] => {
  return [x, 0, y];
};

const Encampment: React.FC<
  MeshProps & {
    coords?: GameCoords;
  }
> = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>();
  const positionArgs = props.coords ? { position: coordsToPosition(props.coords) } : {};

  return (
    <mesh {...props} {...positionArgs} ref={mesh} scale={[1, 1, 1]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
};

export default Encampment;
