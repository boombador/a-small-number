import React from 'react';
import { useSelector } from 'react-redux';

import { gameStateSelector } from 'src/state';

import { Allocations } from './allocations';
import { Resources } from './resources';

export const App: React.FunctionComponent = () => {
  const { progress } = useSelector(gameStateSelector);

  return (
    <div>
      <h1>Day: {progress.day}</h1>
      <Resources />
      <Allocations />
    </div>
  );
};
