const DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const UPLOAD_URL = 'https://23.javascript.pages.academy/kekstagram';

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

const sendData = (onSuccess, onFail, body) => {
  fetch(UPLOAD_URL, {
    method: 'POST',
    body,
  })
  .then((response) => {
    if(response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
  .catch(() => {
    onFail();
  });
};

export {getData, sendData};
