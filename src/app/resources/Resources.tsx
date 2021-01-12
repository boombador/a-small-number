import React from 'react';
import { useSelector } from 'react-redux';

import { gameStateSelector } from 'src/state';
import { ResourceType } from 'src/game';

import { ResourceItem } from './ResourceItem';

export const Resources: React.FunctionComponent = () => {
  const { resources } = useSelector(gameStateSelector);
  const resourceItems = Object.entries(resources.stored).map(([resourceName, amount]) => (
    <li key={resourceName} style={{ display: 'inline-block', margin: '0 2rem 1rem 0', width: '40%' }}>
      <ResourceItem resource={resourceName as ResourceType} amount={amount} />
    </li>
  ));

  return (
    <div>
      <h1>Resources</h1>
      <ul>{resourceItems}</ul>
    </div>
  );
};
