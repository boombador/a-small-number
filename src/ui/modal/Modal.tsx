import React from 'react';

import { Portal } from './Portal';

import './Modal.css';

type Props = {
  onClose?: () => void;
};

export const Modal: React.FunctionComponent<Props> = ({ children, onClose }) => {
  return (
    <Portal>
      <div id="modal">
        {children} <button onClick={onClose}>Clear</button>
      </div>
    </Portal>
  );
};
