import {setPreviewImgEffect} from './img-upload.js';
import {setSliderOptions} from './effect-level.js';

const Effects = [
  {
    NAME: 'chrome',
    UNIT: '',
    MIN_LEVEL: 0,
    MAX_LEVEL: 1,
    STEP: 0.1,
    FILTER: 'grayscale',
  },
  {
    NAME: 'sepia',
    UNIT: '',
    MIN_LEVEL: 0,
    MAX_LEVEL: 1,
    STEP: 0.1,
    FILTER: 'sepia',
  },
  {
    NAME: 'marvin',
    UNIT: '%',
    MIN_LEVEL: 0,
    MAX_LEVEL: 100,
    STEP: 1,
    FILTER: 'invert',
  },
  {
    NAME: 'phobos',
    UNIT: 'px',
    MIN_LEVEL: 0,
    MAX_LEVEL: 3,
    STEP: 0.1,
    FILTER: blur,
  },
  {
    NAME: 'heat',
    UNIT: '',
    MIN_LEVEL: 0,
    MAX_LEVEL: 3,
    STEP: 0.1,
    FILTER: 'brightness',
  },
];

const effectsListNode = document.querySelector('.effects__list');

const onEffectsListClick = (evt) => {
  const effectName = evt.target.id.split('-')[1];
  let effect = Effects.find((effect) =>  effect.NAME === effectName);

  setPreviewImgEffect(effectName);
  setSliderOptions(effect);
};


effectsListNode.addEventListener('click', onEffectsListClick);
