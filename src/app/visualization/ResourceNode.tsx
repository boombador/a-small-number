import React, { useRef } from 'react';
import type { Mesh } from 'three';
import { MeshProps } from 'react-three-fiber';
import { GameCoords, Vec3Array, ResourceType } from 'src/game';

export type ResourceNodeProps = {
  coords: GameCoords;
  type: ResourceType;
  quantity: number;
  name: string;
};

const coordsToPosition = ([x, y]: GameCoords): Vec3Array => {
  return [x, y, 0.5];
};

const ResourceNode: React.FC<MeshProps & ResourceNodeProps> = (props) => {
  const mesh = useRef<Mesh>();
  const positionArgs = props.coords ? { position: coordsToPosition(props.coords) } : {};

  return (
    <mesh {...props} {...positionArgs} ref={mesh} scale={[1, 1, 1]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'blue'} />
    </mesh>
  );
};

export default ResourceNode;
