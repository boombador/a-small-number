import React from 'react';

import { ResourceType } from 'src/game';
import { formatText } from 'src/utils/text';

type Props = {
  resource: ResourceType;
  amount: number;
};

export const ResourceItem: React.FunctionComponent<Props> = ({ resource, amount }) => {
  return (
    <div>
      {formatText(resource)}: {Math.round(amount)}
    </div>
  );
};
