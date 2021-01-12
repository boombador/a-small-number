import React from 'react';
import { Canvas } from 'react-three-fiber';
import Encampment from './Encampment';

import './Visualization.css';

export const Visualization: React.FunctionComponent = () => {
  return (
    <div className="visualization-section">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Encampment position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
};
