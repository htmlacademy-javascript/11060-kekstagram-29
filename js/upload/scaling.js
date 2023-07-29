const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const DEFAULT_SCALE = 100;
const PERCENT_DIVIDER = 100;
let currentScale = 100;

const setStyleTransform = () => {
  image.style.transform = `scale(${currentScale / PERCENT_DIVIDER})`;
};

const setSmallerScale = () => {
  if (currentScale > SCALE_MIN) {
    scaleValue.value = `${currentScale - SCALE_STEP}%`;
    currentScale = currentScale - SCALE_STEP;
  }
  setStyleTransform();
};

const setBiggerScale = () => {
  if (currentScale < SCALE_MAX) {
    scaleValue.value = `${currentScale + SCALE_STEP}%`;
    currentScale = currentScale + SCALE_STEP;
  }
  setStyleTransform();
};

const buttonSmallerClickHanler = () => setSmallerScale();
const buttonBiggerClickHanler = () => setBiggerScale();

const addImageScaling = () => {
  buttonSmaller.addEventListener('click', buttonSmallerClickHanler);
  buttonBigger.addEventListener('click', buttonBiggerClickHanler);
};

const resetScale = () => {
  image.style.transform = '';
  currentScale = DEFAULT_SCALE;
};

export { addImageScaling, resetScale };
