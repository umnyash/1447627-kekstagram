const getRandomInt = (from, to) => {
  let min = Math.min(from, to);
  let max = Math.max(from, to);

  return Math.floor(min + Math.random() * (max - min + 1));
};

const getRandomArrayItem = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

const checkLength = (string, maxLength) => {
  return (string.length <= maxLength);
};

export {getRandomInt, getRandomArrayItem, checkLength};
