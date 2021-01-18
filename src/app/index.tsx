import React from 'react';
import { useSelector } from 'react-redux';

import { gameStateSelector } from 'src/state';

import { Allocations } from './allocations';
import { Resources } from './resources';
import { Visualization } from './visualization';
import { Advance } from './advance';

export const App: React.FunctionComponent = () => {
  const gameState = useSelector(gameStateSelector);
  const visualizationArgs = { gameState };

  return (
    <div>
      <Visualization {...visualizationArgs} />
      <div className="ui-section">
        <h1>Day {gameState.progress.day}</h1>
        <Resources />
        <Allocations />
        <Advance />
      </div>
    </div>
  );
};
