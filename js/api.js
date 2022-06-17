const DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data';

const getData = (onSuccess, onFail) => {
  fetch(DATA_URL)
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        onFail();
      }
    })
    .then((photoDescriptions) => {
      onSuccess(photoDescriptions)
    })
    .catch(() => {
      onFail();
    });
};

export {getData};
