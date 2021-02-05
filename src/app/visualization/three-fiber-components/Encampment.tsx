import React from 'react';
import { MeshProps } from 'react-three-fiber';
import { useGLTFData } from './Asset';
import { positionArgsFromCoords, Encampment } from 'src/game';

const EncampmentComponent: React.FC<MeshProps & Encampment> = (props) => {
  const adjustedProps = { ...props, ...positionArgsFromCoords(props.coords) };
  const { nodes, materials } = useGLTFData();
  return <mesh material={materials['']} geometry={nodes['Camp'].geometry} {...adjustedProps} />;
};

export default EncampmentComponent;
