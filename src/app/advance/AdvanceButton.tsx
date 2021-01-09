import React from 'react';
import { useDispatch } from 'react-redux';

import { advanceDay } from 'src/state';

type Props = {
  onClick: () => void;
};

export const AdvanceButton: React.FunctionComponent<Props> = ({ onClick }) => {
  const dispatch = useDispatch();

  const onClickAction = () => {
    dispatch(advanceDay());
    onClick();
  };

  return <button onClick={onClickAction}>Advance</button>;
};
