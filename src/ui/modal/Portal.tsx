import { createPortal } from 'react-dom';

import { usePortal } from 'src/hooks';

export const Portal: React.FunctionComponent = ({ children }) => {
  const target = usePortal();
  return createPortal(children, target);
};
