import React from 'react';
import { Canvas } from 'react-three-fiber';
import './Visualization.css';
import CanvasContents from './three-fiber-components/CanvasContents';
import { GameState } from 'src/game';

export const Visualization: React.FC<{ gameState: GameState }> = ({ gameState }) => {
  return (
    <div className="visualization-section">
      <Canvas>
        <CanvasContents gameState={gameState} />
      </Canvas>
    </div>
  );
};
