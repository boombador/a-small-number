import React from 'react';

import { ResourceType } from 'src/game';
import { formatText } from 'src/utils/text';

import HumanSVG from 'src/ui/images/icons/Human.svg';
import FoodSVG from 'src/ui/images/icons/Food.svg';
import WaterSVG from 'src/ui/images/icons/Water.svg';
import WoodSVG from 'src/ui/images/icons/Wood.svg';
import { resourceColors } from 'src/game/constants';

const URLMapping: { [K in ResourceType]: string } = {
  people: HumanSVG,
  food: FoodSVG,
  water: WaterSVG,
  wood: WoodSVG,
};

type Props = {
  resource: ResourceType;
  amount: number;
};

export const ResourceItem: React.FunctionComponent<Props> = ({ resource, amount }) => {
  return (
    <div>
      <img src={URLMapping[resource]} style={{ width: '1.5rem', verticalAlign: 'bottom' }} />{' '}
      <b>
        <span style={{ color: resourceColors[resource] }}>{formatText(resource)}</span>: {Math.round(amount)}
      </b>
    </div>
  );
};
