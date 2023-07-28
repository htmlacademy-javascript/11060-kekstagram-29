import {effectsListChangeHandler, initSlider} from './effects.js';
import {addValidator, validateByPristine, resetPristine} from './validate.js';
import {addImageScaling, resetScale} from './scaling.js';
import {sendData} from '../utils/api.js';
import {blockSubmitButton} from '../utils/util.js';
import {createSuccessMessage, createErrorMessage} from './popup-messages.js';
import {initFileUpload} from './upload-file.js';

const MAX_LENGTH = 140;
const POST_URL = 'https://29.javascript.pages.academy/kekstagram';
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const fileUpload = form.querySelector('.img-upload__input');
const closeFormButton = form.querySelector('.img-upload__cancel');
const formDescriptionField = form.querySelector('.text__description');
const effectsList = document.querySelector('.effects__list');
const effectLevelChecked = effectsList.querySelector('input:checked');

const fileUploadClickHandler = () => openForm();
const сloseButtonClickHandler = () => closeForm();

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  if (validateByPristine()) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    sendData(POST_URL, formData, createSuccessMessage, createErrorMessage);
  }
};

const formEscKeydownHandler = (evt) => {
  if (evt.key === 'Escape'
  && !evt.target.matches('.text__description')
  && !evt.target.matches('.text__hashtags')
  && !document.querySelector('.error')
  && !document.querySelector('.success')) {
    evt.preventDefault();
    closeForm();
  }
};

const setFormAttributes = () => {
  form.action = 'https://29.javascript.pages.academy/kekstagram';
  form.method = 'POST';
  form.enctype = 'multipart/form-data';
  formDescriptionField.setAttribute('maxlength', MAX_LENGTH);
};

function openModal () {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFormButton.addEventListener('click', сloseButtonClickHandler);
  document.addEventListener('keydown', formEscKeydownHandler);
}

function closeModal () {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeFormButton.removeEventListener('click', сloseButtonClickHandler);
  document.removeEventListener('keydown', formEscKeydownHandler);
}

function openForm () {
  openModal();
  form.addEventListener('submit', formSubmitHandler);
  effectsList.addEventListener('change', effectsListChangeHandler);
}

function closeForm () {
  closeModal();
  form.removeEventListener('submit', formSubmitHandler);
  effectsList.removeEventListener('change', effectsListChangeHandler);
  resetPristine();
  resetScale();
  form.reset();
}

const initForm = () => {
  setFormAttributes();
  addValidator();
  addImageScaling();
  initSlider(effectLevelChecked);
  initFileUpload();
  fileUpload.addEventListener('change', fileUploadClickHandler);
};

export {initForm, closeForm};
