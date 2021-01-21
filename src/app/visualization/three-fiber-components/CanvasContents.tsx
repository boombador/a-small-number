import React, { useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { Vector3 } from 'three';
import {
  cameraOrbitRadius,
  cameraOrbitHeight,
  upDirection,
  GameState,
  GameCoords,
  Encampment,
  ResourceNode,
} from 'src/game';
// TODO: better names for types / components / filenames / imports
import EncampmentComponent from './Encampment';
import GroundComponent from './Ground';
import ResourceNodeComponent from './ResourceNode';

type CanvasProps = { gameState: GameState };
type Milliseconds = number;

const offsetToCameraCoords = (offset: Milliseconds): number[] => {
  const radians = offset;
  const x = Math.cos(radians) * cameraOrbitRadius;
  const y = Math.sin(radians) * cameraOrbitRadius;
  return [x, y, cameraOrbitHeight]; // may need to fiddle
};

const renderArgsFromGameState = (
  gameState: GameState,
): { encampmentArgs: Encampment; resourceNodeArgsList: ResourceNode[] } => {
  return {
    encampmentArgs: { coords: [0, 0] as GameCoords },
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
      <GroundComponent />
      <EncampmentComponent {...encampmentArgs} />
      {resourceNodeArgsList.map((resourceNodeArgs) => (
        <ResourceNodeComponent {...resourceNodeArgs} />
      ))}
    </>
  );
};

export default CanvasContents;
