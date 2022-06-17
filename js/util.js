const ALERT_SHOW_TIME = 5000;

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

const checkMinLength = (string, minLength) => {
  return (string.length >= minLength);
};

const checkMaxLength = (string, maxLength) => {
  return (string.length <= maxLength);
};

const isEscEvent = (evt) => {
  return evt.key === Keys.ESCAPE || evt.key === Keys.ESC;
};

const showAlert = (message) => {
  const alert = document.createElement('p');
  alert.style.zIndex = 100;
  alert.style.position = 'fixed';
  alert.style.top = 0;
  alert.style.right = 0;
  alert.style.left = 0;
  alert.style.padding = '10px';
  alert.style.margin = '0';
  alert.style.fontSize = '20px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;

  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInteger, getRandomArrayItem, createUniqueRandomIntegerGenerator, isEscEvent, checkMinLength, checkMaxLength, showAlert};
