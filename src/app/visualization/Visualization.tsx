import React, { useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Vector3 } from 'three';

import './Visualization.css';
import Encampment from './Encampment';
import Ground from './Ground';

type milliseconds = number;

const cameraOrbitRadius = 2;

const offsetToCameraCoords = (offset: milliseconds): number[] => {
  const radians = offset;
  const x = Math.cos(radians) * cameraOrbitRadius;
  const y = Math.sin(radians) * cameraOrbitRadius;
  return [x, 2, y]; // may need to fiddle
};

const GameScene: React.FunctionComponent = () => {
  const [totalDelta, setTotalDelta] = useState(0);

  useFrame((state, delta) => {
    state.camera.position.fromArray(offsetToCameraCoords(totalDelta));
    state.camera.lookAt(new Vector3(0, 0, 0));
    state.camera.updateProjectionMatrix();
    setTotalDelta(totalDelta + delta);
  });

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <axesHelper args={[3]} />
      <Ground />
      <Encampment coords={[2, 0]} />
    </>
  );
};

export const Visualization: React.FunctionComponent = () => {
  return (
    <div className="visualization-section">
      <Canvas>
        <GameScene></GameScene>
      </Canvas>
    </div>
  );
};
