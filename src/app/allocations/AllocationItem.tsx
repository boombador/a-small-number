import React from 'react';
import { useDispatch } from 'react-redux';

import { ActivityType } from 'src/game';
import { incrementAllocation, decrementAllocation } from 'src/state';
import { formatText } from 'src/utils/text';

import './AllocationItem.css';

type Props = {
  activity: ActivityType;
  amount: number;
  remainingPeople: number;
};

export const Allocation: React.FunctionComponent<Props> = ({ activity, amount, remainingPeople }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <span style={{ color: '' }}>{formatText(activity)}:</span> <b>{amount}</b>
      <br />
      <button disabled={amount < 5} onClick={() => dispatch(decrementAllocation({ activity, amount: 5 }))}>
        - 5
      </button>
      &nbsp;
      <button disabled={amount === 0} onClick={() => dispatch(decrementAllocation({ activity, amount: 1 }))}>
        - 1
      </button>
      &nbsp;&nbsp;
      <button disabled={amount === 0} onClick={() => dispatch(decrementAllocation({ activity, amount }))}>
        X
      </button>
      &nbsp;&nbsp;
      <button disabled={remainingPeople === 0} onClick={() => dispatch(incrementAllocation({ activity, amount: 1 }))}>
        + 1
      </button>
      &nbsp;
      <button disabled={remainingPeople < 5} onClick={() => dispatch(incrementAllocation({ activity, amount: 5 }))}>
        + 5
      </button>
    </div>
  );
};
