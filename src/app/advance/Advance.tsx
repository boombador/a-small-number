import React from 'react';
import { useSelector } from 'react-redux';

import { gameStateSelector } from 'src/state';
import { Modal } from 'src/ui';

import { AdvanceButton } from './AdvanceButton';

export const Advance: React.FunctionComponent = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const {
    progress: { day, messages },
  } = useSelector(gameStateSelector);
  const messageInfo = messages.map((message, i) => <p key={i}>{message}</p>);

  return (
    <div>
      <AdvanceButton
        onClick={() => {
          setModalOpen(true);
        }}
      />
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2>Day {day - 1}</h2>
          {messageInfo}
        </Modal>
      )}
    </div>
  );
};
