import React from 'react';
import { useSelector } from 'react-redux';

import { gameStateSelector, ResourceType } from 'src/state';

import { ResourceItem } from './ResourceItem';

export const Resources: React.FunctionComponent = () => {
  const { resources } = useSelector(gameStateSelector);
  const resourceItems = Object.entries(resources.stored).map(([resourceName, amount]) => (
    <li key={resourceName}>
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
