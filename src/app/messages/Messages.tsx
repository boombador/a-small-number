import React from 'react';
import { useSelector } from 'react-redux';

import { gameStateSelector } from 'src/state';

import './Messages.css';

const MAX_TYPE_SPEED = 50;

export const Messages: React.FunctionComponent = () => {
  const {
    progress: { day, messages },
  } = useSelector(gameStateSelector);

  const [currentText, setCurrentText] = React.useState(new Array<string>(messages.length));
  const [remainingText, setRemainingText] = React.useState<string[]>([]);
  const [updateTimeout, setUpdateTimeout] = React.useState<NodeJS.Timeout>();

  React.useEffect(() => {
    setCurrentText([]);
    setRemainingText(messages);
    if (updateTimeout) clearTimeout(updateTimeout);
  }, [day]);

  React.useEffect(() => {
    if (remainingText.length && remainingText[0].length) {
      const currentLineIndex = messages.length - remainingText.length;
      const currentLine = currentText[currentLineIndex];
      const newLine = (currentLine || '') + remainingText[0][0];
      const newCurrentText = [...currentText];
      newCurrentText[currentLineIndex] = newLine;

      const newRemainingText = [remainingText[0].slice(1), ...remainingText.slice(1)];

      setCurrentText(newCurrentText);
      setUpdateTimeout(setTimeout(() => setRemainingText(newRemainingText), Math.random() * MAX_TYPE_SPEED));
    } else if (remainingText.length && !remainingText[0].length) {
      setUpdateTimeout(setTimeout(() => setRemainingText(remainingText.slice(1)), Math.random() * MAX_TYPE_SPEED));
    }
  }, [JSON.stringify(remainingText)]);

  const messageInfo = currentText.filter(Boolean).map((text, i) => (
    <React.Fragment key={`${i}-fragment`}>
      <p key={i}>
        {text}
        {i === currentText.length - 1 && <span className="cursor"></span>}
      </p>
      <br key={`${i}-br`} />
    </React.Fragment>
  ));

  return <div className="message-box">{messageInfo}</div>;
};
