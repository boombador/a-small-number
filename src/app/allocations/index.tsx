import React from 'react';
import { useSelector } from 'react-redux';

import { gameStateSelector } from 'src/state';

export const Allocations: React.FunctionComponent = () => {
  const { allocations } = useSelector(gameStateSelector);
  const allocationItems = Object.entries(allocations).map(([allocationName, value]) => (
    <li>
      {allocationName}: {value}
    </li>
  ));

  return (
    <div>
      <h1>Allocations</h1>
      <ul>{allocationItems}</ul>
    </div>
  );
};
