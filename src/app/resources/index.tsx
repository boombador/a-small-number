import React from 'react';
import { useSelector } from 'react-redux';

import { gameStateSelector } from 'src/state';

export const Resources: React.FunctionComponent = () => {
  const { resources } = useSelector(gameStateSelector);
  const resourceItems = Object.entries(resources.stored).map(([resourceName, value]) => (
    <li key={resourceName}>
      {resourceName}: {value}
    </li>
  ));

  return (
    <div>
      <h1>Resources</h1>
      <ul>{resourceItems}</ul>
    </div>
  );
};
