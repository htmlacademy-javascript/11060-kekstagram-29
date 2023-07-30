import { effectsListChangeHandler, initSlider } from './effects.js';
import { addValidator, validateByPristine, resetPristine } from './validate.js';
import { addImageScaling, resetScale } from './scaling.js';
import { sendData } from '../utils/api.js';
import { blockSubmitButton, isEscapeKey } from '../utils/util.js';
import { createSuccessMessage, createErrorMessage } from './popup-messages.js';
import { initFileUpload } from './upload-file.js';

const POST_URL = 'https://29.javascript.pages.academy/kekstagram';

const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const fileUpload = form.querySelector('.img-upload__input');
const closeFormButton = form.querySelector('.img-upload__cancel');
const effectsList = document.querySelector('.effects__list');
const effectLevelChecked = effectsList.querySelector('input:checked');

const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFormButton.addEventListener('click', closeButtonClickHandler);
  document.addEventListener('keydown', formEscKeydownHandler);
};

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeFormButton.removeEventListener('click', closeButtonClickHandler);
  document.removeEventListener('keydown', formEscKeydownHandler);
  resetPristine();
  initSlider(effectLevelChecked);
  resetScale();
  form.reset();
};

const fileUploadClickHandler = () => openForm();

const sendSuccess = () => {
  closeForm();
  createSuccessMessage();
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  if (validateByPristine()) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    sendData(POST_URL, formData, sendSuccess, createErrorMessage);
  }
};

function closeButtonClickHandler () {
  closeForm();
}

function formEscKeydownHandler(evt) {
  if (isEscapeKey
    && !evt.target.matches('.text__description')
    && !evt.target.matches('.text__hashtags')
    && !document.querySelector('.error')
    && !document.querySelector('.success')) {
    evt.preventDefault();
    closeForm();
  }
}

const initForm = () => {
  addValidator();
  addImageScaling();
  initSlider(effectLevelChecked);
  initFileUpload();
  fileUpload.addEventListener('change', fileUploadClickHandler);
  form.addEventListener('submit', formSubmitHandler);
  effectsList.addEventListener('change', effectsListChangeHandler);
};

export { initForm, closeForm };
