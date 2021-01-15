import React from 'react';
import { useSelector } from 'react-redux';
import Color from 'color';

import { ActivityType } from 'src/game';
import { activityColors } from 'src/game/constants';
import { gameStateSelector } from 'src/state';

import { Allocation } from './AllocationItem';

import './Allocations.css';

export const Allocations: React.FunctionComponent = () => {
  const { activityAllocations, resources } = useSelector(gameStateSelector);

  const allocatedPeople = Object.values(activityAllocations).reduce((a, b) => a + b, 0);
  const remainingPeople = resources.stored.people - allocatedPeople;

  const allocationItems = Object.entries(activityAllocations).map(([activity, amount]) => {
    const borderColor = Color(activityColors[activity as ActivityType]);
    const backgroundColor = Color(activityColors[activity as ActivityType]).alpha(0.1);

    return (
      <li
        className="allocation"
        key={activity}
        style={{
          borderColor: borderColor.rgb().string(),
          background: backgroundColor.rgb().string(),
        }}
      >
        <Allocation activity={activity as ActivityType} amount={amount} remainingPeople={remainingPeople} />
      </li>
    );
  });

  return (
    <div>
      <h1>Allocations</h1>
      <ul>{allocationItems}</ul>
    </div>
  );
};
