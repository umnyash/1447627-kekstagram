import {sendData} from './api.js';
import {isEscEvent} from './util.js';

const Scale = {
  MIN_VALUE: 25,
  MAX_VALUE: 100,
  INITIAL_VALUE: 100,
  STEP: 25,
};

const photoEditForm = document.querySelector('.img-upload__form');
const photoUploadInput = photoEditForm.querySelector('.img-upload__input');

const photoUploadModal = photoEditForm.querySelector('.img-upload__overlay');
const photo = photoUploadModal.querySelector('.img-upload__preview img');
const modalCloseButton = photoUploadModal.querySelector('.img-upload__cancel');
const hashtagsField = photoUploadModal.querySelector('.text__hashtags');
const descriptionField = photoUploadModal.querySelector('.text__description');

// Масштабирование изображения

const scale = document.querySelector('.scale');
const scaleInput = scale.querySelector('.scale__control--value');
const scaleMinusButton = scale.querySelector('.scale__control--smaller');
const scalePlusButton = scale.querySelector('.scale__control--bigger');
let scaleValue = Scale.INITIAL_VALUE;

const setPhotoScale = () => {
  scaleInput.value = `${scaleValue}%`;
  photo.style.transform = `scale(${scaleValue / 100})`;
};

const resetPhotoScale = () => {
  scaleValue = Scale.INITIAL_VALUE;
  setPhotoScale();
};

scaleMinusButton.addEventListener('click', () => {
  if (scaleValue <= Scale.MIN_VALUE) {
    return;
  }

  scaleValue -= Scale.STEP;
  setPhotoScale();
});

scalePlusButton.addEventListener('click', () => {
  if (scaleValue >= Scale.MAX_VALUE) {
    return;
  }

  scaleValue += Scale.STEP
  setPhotoScale();
});

// Добавление/удаление фотоэффекта

const effectLevelWrapper = photoUploadModal.querySelector('.img-upload__effect-level');

const setPhotoEffectClass = (className) => {
  photo.className = className;
};

const setPhotoFilter = (filter) => {
  photo.style.filter = filter;
};

const removePhotoEffect = () => {
  setPhotoEffectClass('effects__preview--none');
  setPhotoFilter('none');
  effectLevelWrapper.classList.add('hidden');
};

// Индикатор фокуса в текстовых полях ввода

let textFieldIsFocus = false;

hashtagsField.addEventListener('focus', () => {
  textFieldIsFocus = true;
});

hashtagsField.addEventListener('blur', () => {
  textFieldIsFocus = false;
});

descriptionField.addEventListener('focus', () => {
  textFieldIsFocus = true;
});

descriptionField.addEventListener('blur', () => {
  textFieldIsFocus = false;
});

// Открытие и закрытие окна просмотра фотографии

const openPhotoUploadModal = () => {
  resetPhotoScale();
  removePhotoEffect();
  photoUploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
};

const closePhotoUploadModal = () => {
  if (textFieldIsFocus) return;

  setPhotoFilter('none');
  photoUploadInput.value = '';
  photoUploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
};

const onModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePhotoUploadModal();
  }
};

photoUploadInput.addEventListener('change', openPhotoUploadModal);

modalCloseButton.addEventListener('click', closePhotoUploadModal);

//
const setPhotoUploadFormSubmit = (onSuccess, onFail) => {
  photoEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target)
    );
  });
};

export {setPhotoEffectClass, setPhotoFilter, removePhotoEffect, setPhotoUploadFormSubmit, closePhotoUploadModal};
