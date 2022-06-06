import {setPreviewImgScale} from './img-upload.js';

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const INITIAL_SCALE_VALUE = 100;
const SCALE_VALUE_STEP = 25;

const scaleNode = document.querySelector('.scale');
const scaleControlValueNode = scaleNode.querySelector('.scale__control--value');
const scaleControlSmallerNode = scaleNode.querySelector('.scale__control--smaller');
const scaleControlBiggerNode = scaleNode.querySelector('.scale__control--bigger');

let scaleValue = INITIAL_SCALE_VALUE;

scaleControlSmallerNode.addEventListener('click', () => {
  if (scaleValue > MIN_SCALE_VALUE) {
    scaleValue -= SCALE_VALUE_STEP;
    scaleControlValueNode.value = scaleValue + '%';
    setPreviewImgScale(scaleValue);
  }
});

scaleControlBiggerNode.addEventListener('click', () => {
  if (scaleValue < MAX_SCALE_VALUE) {
    scaleValue += SCALE_VALUE_STEP;
    scaleControlValueNode.value = scaleValue + '%';
    setPreviewImgScale(scaleValue);
  }
});

scaleControlValueNode.value = INITIAL_SCALE_VALUE + '%';
