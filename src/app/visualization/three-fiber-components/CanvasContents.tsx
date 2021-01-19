import React, { useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { Vector3 } from 'three';
import {
  cameraOrbitRadius,
  cameraOrbitHeight,
  upDirection,
  GameState,
  GameCoords,
  ResourceNode as ResourceNodeType,
} from 'src/game';
import Encampment, { EncampmentProps } from './Encampment';
import Ground from './Ground';
import ResourceNodeComponent from './ResourceNode';

type CanvasProps = { gameState: GameState };

type milliseconds = number;

const placeholderEncampmentArgs = { coords: [0, 0] as GameCoords };

const offsetToCameraCoords = (offset: milliseconds): number[] => {
  const radians = offset;
  const x = Math.cos(radians) * cameraOrbitRadius;
  const y = Math.sin(radians) * cameraOrbitRadius;
  return [x, y, cameraOrbitHeight]; // may need to fiddle
};

const renderArgsFromGameState = (
  gameState: GameState,
): { encampmentArgs: EncampmentProps; resourceNodeArgsList: ResourceNodeType[] } => {
  return {
    encampmentArgs: placeholderEncampmentArgs,
    resourceNodeArgsList: gameState.exploration.discoveredResources,
  };
};

/* The canvas contents are separated into their own function component (FC)
   because react-three-fiber requires that its hooks only be used in components
   embedded within the fiber-enriched Canvas component */
const CanvasContents: React.FC<CanvasProps> = ({ gameState }) => {
  const [totalDelta, setTotalDelta] = useState(0);

  useFrame((state, delta) => {
    state.camera.position.fromArray(offsetToCameraCoords(totalDelta));
    state.camera.up.fromArray(upDirection);
    state.camera.lookAt(new Vector3(0, 0, 0));
    state.camera.updateProjectionMatrix();
    setTotalDelta(totalDelta + delta);
  });

  const { encampmentArgs, resourceNodeArgsList } = renderArgsFromGameState(gameState);
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Ground />
      <Encampment {...encampmentArgs} />
      {resourceNodeArgsList.map((resourceNodeArgs) => (
        <ResourceNodeComponent {...resourceNodeArgs} />
      ))}
    </>
  );
};

export default CanvasContents;
