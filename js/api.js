const DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data';

const getData = (onSuccess) => {
  fetch(DATA_URL)
    .then((response) => response.json())
    .then((photoDescriptions) => {
      onSuccess(photoDescriptions)
    });
};

export {getData};
