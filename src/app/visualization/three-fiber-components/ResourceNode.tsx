import React, { useRef } from 'react';
import type { Mesh } from 'three';
import { MeshProps } from 'react-three-fiber';
import { positionArgsFromCoords, ResourceNode } from 'src/game';

const ResourceNodeComponent: React.FC<MeshProps & ResourceNode> = (props) => {
  const mesh = useRef<Mesh>();
  return (
    <mesh {...props} {...positionArgsFromCoords(props.coords)} ref={mesh} scale={[1, 1, 1]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'blue'} />
    </mesh>
  );
};

export default ResourceNodeComponent;
