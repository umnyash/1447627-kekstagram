import {isEscEvent} from './util.js';

const imgUploadNode = document.querySelector('.img-upload');
const imgUploadInputNode = imgUploadNode.querySelector('#upload-file');
const imgUploadOverlayNode = imgUploadNode.querySelector('.img-upload__overlay');
const imgUploadCancelNode = imgUploadNode.querySelector('#upload-cancel');
const imgUploadPreviewImgNode = imgUploadNode.querySelector('.img-upload__preview img');

const onImgUploadOverlayEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeImgUploadOverlay();
  }
};

const openImgUploadOverlay = () => {
  imgUploadOverlayNode.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onImgUploadOverlayEscKeydown);
};

const closeImgUploadOverlay = () => {
  imgUploadOverlayNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onImgUploadOverlayEscKeydown);
};

const setPreviewImgScale = (scale) => {
  imgUploadPreviewImgNode.style.transform = `scale(${scale}%)`;
};

const setPreviewImgEffect = (effect) => {
  if (effect === 'none') {
    imgUploadPreviewImgNode.className = '';
  } else {
    imgUploadPreviewImgNode.className = `effects__preview--${effect}`;
  }
};

imgUploadInputNode.addEventListener('change', openImgUploadOverlay);

imgUploadCancelNode.addEventListener('click', closeImgUploadOverlay);

openImgUploadOverlay();

export {setPreviewImgScale, setPreviewImgEffect};
