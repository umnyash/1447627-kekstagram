/* global noUiSlider */

import '../nouislider/nouislider.js';
import {setPhotoEffectClass, setPhotoFilter, removePhotoEffect} from './photo-upload-modal.js';

const Effects = {
  chrome: {
    UNIT: '',
    MIN_LEVEL: 0,
    MAX_LEVEL: 1,
    STEP: 0.1,
    FILTER: 'grayscale',
  },
  sepia: {
    UNIT: '',
    MIN_LEVEL: 0,
    MAX_LEVEL: 1,
    STEP: 0.1,
    FILTER: 'sepia',
  },
  marvin: {
    UNIT: '%',
    MIN_LEVEL: 0,
    MAX_LEVEL: 100,
    STEP: 1,
    FILTER: 'invert',
  },
  phobos: {
    UNIT: 'px',
    MIN_LEVEL: 0,
    MAX_LEVEL: 3,
    STEP: 0.1,
    FILTER: 'blur',
  },
  heat: {
    UNIT: '',
    MIN_LEVEL: 0,
    MAX_LEVEL: 3,
    STEP: 0.1,
    FILTER: 'brightness',
  },
};

const effectLevelWrapper = document.querySelector('.effect-level');
const effectLevelInput = effectLevelWrapper.querySelector('.effect-level__value');
const effectLevelRange = effectLevelWrapper.querySelector('.effect-level__slider');

// Инициализация диапазона

noUiSlider.create(effectLevelRange, {
  range: {
    min: 0,
    max: 1,
  },
  connect: 'lower',
  start: 1,
  step: 0.1,
  animate: false,
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

// Функция для обновления настроек диапазона

const setRangeOptions = (effectName) => {
  effectLevelRange.noUiSlider.updateOptions({ // при изменении настроек срабатывает событие перемещения ползунка!
    range: {
      min: Effects[effectName].MIN_LEVEL,
      max: Effects[effectName].MAX_LEVEL,
    },
    step: Effects[effectName].STEP,
  });

  effectLevelRange.noUiSlider.set(Effects[effectName].MAX_LEVEL);
};

// Функция для создания фотофильтра (значения для CSS-свойства filter)

const createFilter = (effect, level) => {
  if (effect === 'none') {
    return;
  }
  return `${Effects[effect].FILTER}(${level}${Effects[effect].UNIT})`;
};

// Выбор фотоэффекта

const effectsButtons = document.querySelectorAll('.effects__radio');
let currentEffect = 'none';

effectsButtons.forEach((button) => {
  button.addEventListener('change', () => {
    const effectName = button.value;

    if (effectName === 'none') {
      removePhotoEffect();
    } else {
      currentEffect = effectName;

      effectLevelInput.step = Effects[effectName].STEP;
      setRangeOptions(effectName);
      setPhotoEffectClass(`effects__preview--${effectName}`);

      effectLevelWrapper.classList.remove('hidden');
    }
  });
});

// Обработка перемещения ползунка

effectLevelRange.noUiSlider.on('update', (values, handle) => {
  effectLevelInput.value = values[handle];
  setPhotoFilter(createFilter(currentEffect, values[handle]));
});
