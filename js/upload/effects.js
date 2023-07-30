const EFFECTS = {
  none: {
    name: '',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'

  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
};

const image = document.querySelector('.img-upload__preview img');
const effectValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level');

const setSliderState = (target) => {
  if (target.matches('#effect-none')) {
    effectLevel.classList.add('hidden');
    image.style.filter = '';
    return;
  }

  effectLevel.classList.remove('hidden');
};

const createSlider = (target) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: EFFECTS[target.value].min,
      max: EFFECTS[target.value].max,
    },
    start: EFFECTS[target.value].max,
    step: EFFECTS[target.value].step,
    connect: 'lower',
  });
};

const updateEffect = (target) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: EFFECTS[target.value].min,
      max: EFFECTS[target.value].max,
    },
    start: EFFECTS[target.value].max,
    step: EFFECTS[target.value].step,
    connect: 'lower',
  });

  sliderElement.noUiSlider.off('update');
  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    image.style.filter = `${EFFECTS[target.value].name}(${effectValue.value}${EFFECTS[target.value].unit})`;
  });
};

const initSlider = (target) => {
  if (!sliderElement.noUiSlider) {
    createSlider(target);
  }

  setSliderState(target);
  updateEffect(target);
};

const effectsListChangeHandler = (evt) => {
  updateEffect(evt.target);
  setSliderState(evt.target);
};

export { initSlider, effectsListChangeHandler };
