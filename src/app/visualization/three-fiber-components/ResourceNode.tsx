import React from 'react';
import { MeshProps } from 'react-three-fiber';
import { positionArgsFromCoords, ResourceNode } from 'src/game';
import { useGLTFData } from './Asset';

const ResourceNodeComponent: React.FC<MeshProps & ResourceNode> = ({ coords, ...meshProps }) => {
  const adjustedProps = { ...meshProps, ...positionArgsFromCoords(coords) };
  const { nodes, materials } = useGLTFData();
  return <mesh material={materials['Vegetation']} geometry={nodes['Bushes'].geometry} {...adjustedProps} />;
};

export default ResourceNodeComponent;
