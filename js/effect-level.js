const effectLevelNode = document.querySelector('.effect-level');
const effectLevelValueNode = effectLevelNode.querySelector('.effect-level__value');
const effectLevelSliderNode = effectLevelNode.querySelector('.effect-level__slider');

const setSliderOptions = (effect) => {
  if (!effect) {
    effectLevelNode.classList.add('hidden');

    return;
  } else {
    effectLevelNode.classList.remove('hidden');

    effectLevelSliderNode.noUiSlider.updateOptions({
      range: {
        min: effect.MIN_LEVEL,
        max: effect.MAX_LEVEL,
      },
      step: effect.STEP,
    });

    effectLevelSliderNode.noUiSlider.set(effect.MAX_LEVEL);
  }
};

window.noUiSlider.create(effectLevelSliderNode, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

let effectLevel;

effectLevelSliderNode.noUiSlider.on('update', (values, handle) => {
  effectLevel = values[handle]
  effectLevelValueNode.value = effectLevel;
});

setSliderOptions();

export {setSliderOptions};
