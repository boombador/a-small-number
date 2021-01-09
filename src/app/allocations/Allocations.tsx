import React from 'react';
import { useSelector } from 'react-redux';

import { ActivityType } from 'src/game';
import { gameStateSelector } from 'src/state';

import { Allocation } from './AllocationItem';

export const Allocations: React.FunctionComponent = () => {
  const { activityAllocations, resources } = useSelector(gameStateSelector);

  const allocatedPeople = Object.values(activityAllocations).reduce((a, b) => a + b, 0);
  const remainingPeople = resources.stored.people - allocatedPeople;

  const allocationItems = Object.entries(activityAllocations).map(([activity, amount]) => (
    <li key={activity}>
      <Allocation activity={activity as ActivityType} amount={amount} remainingPeople={remainingPeople} />
    </li>
  ));

  return (
    <div>
      <h1>Allocations</h1>
      <ul>{allocationItems}</ul>
    </div>
  );
};
