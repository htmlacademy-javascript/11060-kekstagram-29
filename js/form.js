import {pristine} from './validate.js';

const form = document.querySelector('.img-upload__form');
const formFileInput = form.querySelector('.img-upload__input');
const formOverlay = form.querySelector('.img-upload__overlay');
const closeFormButton = form.querySelector('.img-upload__cancel');
const uploadControlButton = form.querySelector('.img-upload__control');

const uploadControlButtonClickHandler = (evt) => {
  evt.preventDefault();
  openForm();
};

uploadControlButton.addEventListener('click', uploadControlButtonClickHandler);

const fillForm = () => {
  form.action = 'https://29.javascript.pages.academy/kekstagram';
  form.method = 'POST';
  form.type = 'multipart/form-data';
  formFileInput.removeAttribute('required');
};

const сloseButtonClickHandler = () => closeForm();

const formEscKeydownHandler = (evt) => {
  if (evt.key === 'Escape' && !evt.target.matches('.text__description') && !evt.target.matches('.text__hashtags')) {
    evt.preventDefault();
    closeForm();
  }
};

function openForm () {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFormButton.addEventListener('click', сloseButtonClickHandler);
  document.addEventListener('keydown', formEscKeydownHandler);
  fillForm();
}

function closeForm () {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeFormButton.removeEventListener('click', сloseButtonClickHandler);
  document.removeEventListener('keydown', formEscKeydownHandler);
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
