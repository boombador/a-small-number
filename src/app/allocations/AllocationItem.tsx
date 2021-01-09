import React from 'react';
import { useDispatch } from 'react-redux';

import { Activity, incrementAllocation, decrementAllocation } from 'src/state';
import { formatText } from 'src/utils/text';

type Props = {
  activity: Activity;
  amount: number;
  remainingPeople: number;
};

export const Allocation: React.FunctionComponent<Props> = ({ activity, amount, remainingPeople }) => {
  const dispatch = useDispatch();

  return (
    <div>
      {formatText(activity)}:{' '}
      <button disabled={amount === 0} onClick={() => dispatch(decrementAllocation({ activity, amount: 1 }))}>
        - 1
      </button>
      {amount}
      <button disabled={remainingPeople === 0} onClick={() => dispatch(incrementAllocation({ activity, amount: 1 }))}>
        + 1
      </button>
    </div>
  );
};
