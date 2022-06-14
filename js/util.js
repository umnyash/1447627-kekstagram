const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const getRandomInteger = (from, to) => {
  let min = Math.min(from, to);
  let max = Math.max(from, to);

  return Math.floor(min + Math.random() * (max - min + 1));
};

const getRandomArrayItem = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const createUniqueRandomIntegerGenerator = (from, to) => {
  const previousValues = [];
  const valuesPerPortion = to - from + 1;
  let portionCount = 1;

  return () => {
    let currentValue = getRandomInteger(from, to);

    if (previousValues.length >= (valuesPerPortion * portionCount)) {
      to += valuesPerPortion;
      from += valuesPerPortion;
      portionCount++;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(from, to);
    }
    previousValues.push(currentValue);

    return currentValue;
  };
};

const checkMaxLength = (string, maxLength) => {
  return (string.length <= maxLength);
};

const isEscEvent = (evt) => {
  return evt.key === Keys.ESCAPE || evt.key === Keys.ESC;
};

checkMaxLength('Умняш', 6);

export {getRandomInteger, getRandomArrayItem, createUniqueRandomIntegerGenerator, isEscEvent};
