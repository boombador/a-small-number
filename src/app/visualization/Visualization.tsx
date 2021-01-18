import React, { useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Vector3 } from 'three';
import { cameraOrbitRadius, cameraOrbitHeight, upDirection, GameState } from 'src/game';
import './Visualization.css';
import Encampment, { EncampmentProps } from './Encampment';
import Ground from './Ground';
import ResourceNode, { ResourceNodeProps } from './ResourceNode';

type milliseconds = number;
type VisualizationProps = { gameState: GameState };

const offsetToCameraCoords = (offset: milliseconds): number[] => {
  const radians = offset;
  const x = Math.cos(radians) * cameraOrbitRadius;
  const y = Math.sin(radians) * cameraOrbitRadius;
  return [x, y, cameraOrbitHeight]; // may need to fiddle
};

// placeholder arguments, eventually derive
const renderArgsFromGameState = (
  gameState: GameState,
): { encampmentArgs: EncampmentProps; resourceNodeArgsList: ResourceNodeProps[] } => {
  return {
    encampmentArgs: { coords: [0, 0] },
    resourceNodeArgsList: [
      { coords: [3, 0], type: 'food', quantity: 10, name: 'Berries' },
      { coords: [0, 3], type: 'wood', quantity: 300, name: 'Copse of Trees' },
    ],
  };
};

/* The canvas contents are separated into their own function component (FC)
   because react-three-fiber requires that its hooks only be used in components
   embedded within the fiber-enriched Canvas component */
export const CanvasContents: React.FC<VisualizationProps> = ({ gameState }) => {
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
        <ResourceNode {...resourceNodeArgs} />
      ))}
    </>
  );
};

// TODO: integrate with non-webgl UI changes
export const Visualization: React.FC<VisualizationProps> = (props) => {
  return (
    <div className="visualization-section">
      <Canvas>
        <CanvasContents {...props} />
      </Canvas>
    </div>
  );
};
