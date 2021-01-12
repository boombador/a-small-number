import React from 'react';
import { useSelector } from 'react-redux';

import { gameStateSelector } from 'src/state';

import './Messages.css';

const MAX_TYPE_SPEED = 0.2;

export const Messages: React.FunctionComponent = () => {
  const {
    progress: { day, messages },
  } = useSelector(gameStateSelector);

  const [currentText, setCurrentText] = React.useState(new Array<string>(messages.length));
  const [remainingText, setRemainingText] = React.useState(messages);

  React.useEffect(() => {
    if (remainingText.length && remainingText[0].length) {
      const currentLineIndex = remainingText.length - messages.length;
      const currentLine = currentText[currentLineIndex];
      const newLine = currentLine + remainingText[0][0];
      const newCurrentText = [...currentText];
      newCurrentText[currentLineIndex] = newLine;

      const newRemainingText = [remainingText[0].slice(1), ...remainingText.slice(1)];

      setCurrentText(newCurrentText);
      setTimeout(() => setRemainingText(newRemainingText), Math.random() * MAX_TYPE_SPEED);
    } else if (remainingText.length && !remainingText[0].length) {
      setTimeout(() => setRemainingText(remainingText.slice(1)), Math.random() * MAX_TYPE_SPEED);
    }
  }, [JSON.stringify(remainingText)]);

  const messageInfo = currentText.map((text) => <p>{text}</p>);

  return <div className="message-box">{messageInfo}</div>;
};
