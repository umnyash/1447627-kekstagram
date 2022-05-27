'use strict';

const getRandomInt = (from, to) => {
  let min = Math.min(from, to);
  let max = Math.max(from, to);

  return Math.floor(min + Math.random() * (max - min + 1));
};

const checkLength = (string, maxLength) => {
  return (string.length <= maxLength);
};

getRandomInt(30, 6);
checkLength('Умняш', 6);
