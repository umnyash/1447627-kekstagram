import {checkMinLength, checkMaxLength} from './util.js';

const MAX_DESCRIPTION_LENGTH = 140;
const HASTAG_MIN_LENGTH = 2;
const HASTAG_MAX_LENGTH = 20;
const HASTAGS_MAX_COUNT = 5;

const ValidUnicodeCharacterRanges = {
  NUMBERS: [48, 57],
  ALPHABET: [65, 90],
};

const photoUploadForm = document.querySelector('.img-upload__form');

// Валидация текста описания фотографии

const descriptionField = photoUploadForm.querySelector('.text__description');

descriptionField.addEventListener('input', () => {
  const text = descriptionField.value;

  if (!checkMaxLength(text, MAX_DESCRIPTION_LENGTH)) {
    descriptionField.setCustomValidity(`Удалите лишние ${text.length - MAX_DESCRIPTION_LENGTH} симв.`);
  } else {
    descriptionField.setCustomValidity('');
  }

  descriptionField.reportValidity();
});

// Валидация хэштегов

const hashtagsField = photoUploadForm.querySelector('.text__hashtags');

// Проверка хэштега на соответствие его символов допустимым
const checkValidCharacters = (hashtag, {NUMBERS, ALPHABET}) => {
  for (let i = 1; i < hashtag.length; i++) {
    const characterCode = hashtag[i].codePointAt();

    if (characterCode < NUMBERS[0] || characterCode > ALPHABET[1] || (characterCode > NUMBERS[1] && characterCode < ALPHABET[0])) {
      return;
    }
  }

  return true;
};

// Общая проверка хэштега
const checkHashtag = (hashtag) => {
  if (!hashtag.startsWith('#')) {
    hashtagsField.setCustomValidity('Каждый хэштег должен начинаться с символа #');
    return;
  }

  if (!checkMinLength(hashtag, HASTAG_MIN_LENGTH)) {
    hashtagsField.setCustomValidity(`Каждый хэштег должен быть не короче ${HASTAG_MIN_LENGTH} симв.`);
    return;
  }

  if (!checkMaxLength(hashtag, HASTAG_MAX_LENGTH)) {
    hashtagsField.setCustomValidity(`Каждый хэштег должен быть не длиннее ${HASTAG_MAX_LENGTH} симв.`);
    return;
  }

  if (!checkValidCharacters(hashtag, ValidUnicodeCharacterRanges)) {
    hashtagsField.setCustomValidity('Каждый хэштег может состоять только из цифр и латинских букв');
    return;
  }

  return true;
};

// Обработка ввода в поле для хэштегов
hashtagsField.addEventListener('input', () => {
  hashtagsField.setCustomValidity('');

  // Если удален последний символ и поле стало пустым, то ничего не делать
  const hashtagsText = hashtagsField.value;
  if (!hashtagsText) {
    return;
  }

  // Создать массив хештегов
  const hashtagsList = hashtagsText.split(' ').map((hashtag) => hashtag.toUpperCase());

  // Если хештегов оказалось больше максимального количества
  if (!checkMaxLength(hashtagsList, HASTAGS_MAX_COUNT)) {
    hashtagsField.setCustomValidity(`Нельзя указать больше ${HASTAGS_MAX_COUNT} хэштегов`);
    hashtagsField.reportValidity();
    return;
  }

  // Проверка каждого хэштега
  for (let i = 0; i < hashtagsList.length; i++) {
    const hashtag = hashtagsList[i];

    // на валидность
    if (!checkHashtag(hashtag)) {
      break;
    }

    // единственный хэштег проверять на уникальность не нужно
    if (i === 0) {
      continue;
    }

    // на уникальность
    if(hashtagsList.lastIndexOf(hashtag, i - 1) > -1) {
      hashtagsField.setCustomValidity('Хэштеги не должны повторяться');
      break;
    }
  }

  hashtagsField.reportValidity();
});
