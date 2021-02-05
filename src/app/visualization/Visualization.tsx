import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import './Visualization.css';
import CanvasContents from './three-fiber-components/CanvasContents';
import { GameState } from 'src/game';
import ErrorBoundary from 'src/utils/ErrorBoundary';
import Cube from './three-fiber-components/Cube';

export const Visualization: React.FC<{ gameState: GameState }> = ({ gameState }) => {
  return (
    <div className="visualization-section">
      <Canvas>
        <ErrorBoundary isGraphical={true}>
          <Suspense fallback={<Cube color="red" />}>
            <CanvasContents gameState={gameState} />
          </Suspense>
        </ErrorBoundary>
      </Canvas>
    </div>
  );
};
