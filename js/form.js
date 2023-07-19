import {effectsListChangeHandler, initSlider} from './effects.js';
import {addValidator, validateByPristine, resetPristine} from './validate.js';
import {addImageScaling, resetScale} from './scaling.js';

const MAX_LENGTH = 140;
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
  if (!validateByPristine()) {
    evt.preventDefault();
  }
};

const formEscKeydownHandler = (evt) => {
  if (evt.key === 'Escape' && !evt.target.matches('.text__description') && !evt.target.matches('.text__hashtags')) {
    evt.preventDefault();
    closeForm();
  }
};

fileUpload.addEventListener('change', fileUploadClickHandler);

const setFormAttributes = () => {
  form.action = 'https://29.javascript.pages.academy/kekstagram';
  form.method = 'POST';
  form.setAttribute('type', 'multipart/form-data');
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
};

export {initForm};
