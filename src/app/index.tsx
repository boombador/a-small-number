import React from 'react';
import { useSelector } from 'react-redux';

import { gameStateSelector } from 'src/state';

import { Allocations } from './allocations';
import { Resources } from './resources';
import { Visualization } from './visualization';
import { Advance } from './advance';
import { Messages } from './messages';

import './layout.css';

export const App: React.FunctionComponent = () => {
  const gameState = useSelector(gameStateSelector);
  return (
    <div>
      <section className="visualization">
        <Visualization gameState={gameState} />
      </section>
      <section className="ui">
        <div className="controls">
          <h1>Day {gameState.progress.day}</h1>
          <Resources />
          <Allocations />

          <div className="advance-wrapper">
            <Advance />
          </div>
        </div>
        <div className="messages">
          <Messages />
        </div>
      </section>
    </div>
  );
};
