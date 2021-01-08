import React from 'react';
import { useSelector } from 'react-redux';

import { gameStateSelector } from 'src/state';

export const Allocations: React.FunctionComponent = () => {
  const { activityAllocations } = useSelector(gameStateSelector);
  const allocationItems = Object.entries(activityAllocations).map(([allocationName, value]) => (
    <li key={allocationName}>
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
