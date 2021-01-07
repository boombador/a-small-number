const capitalize = (text: string): string => {
  return text[0].toUpperCase() + text.slice(1);
};

export const formatText = (text: string): string => {
  const words = text.split('_').map((word) => word.toLocaleLowerCase());
  if (words.length === 0) return text;

  return capitalize(words[0]) + ' ' + words.slice(1).join(' ');
};
