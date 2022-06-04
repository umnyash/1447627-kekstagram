import { isEscEvent } from './util.js';

const overlay = document.querySelector('.overlay');

const onOverlayEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeOverlay();
  }
};

const openOverlay = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onOverlayEscKeydown);
};

const closeOverlay = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onOverlayEscKeydown);
};

export {openOverlay, closeOverlay};
