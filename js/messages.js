import { isEscEvent } from "./util.js";

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

let message;

const showMessage = (type) => {
  switch(type) {
    case 'error':
      message = errorMessageTemplate.cloneNode(true);
      break;
    case 'success':
      message = successMessageTemplate.cloneNode(true);
      break;
  }
  document.body.appendChild(message);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageOutsideClick);
};

const closeMessage = () => {
  message.remove();
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onMessageOutsideClick);
};

const onMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onMessageOutsideClick = (evt) => {
  if (evt.target.className === 'error' || evt.target.className === 'success' || evt.target.tagName === 'BUTTON') {
    closeMessage();
  }
}

export {showMessage, closeMessage};
