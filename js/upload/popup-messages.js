import {closeForm} from './form.js';
import {unblockSubmitButton} from '../utils/util.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const closeButtonClickHandler = () => closeMessage();

const messageEscKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMessage();
  }
};

const messageClickOutsideHandler = (evt) => {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  if (messageElement === evt.target) {
    closeMessage();
  }
};

function closeMessage () {
  if (document.querySelector('.success')) {
    closeForm();
  }

  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', messageEscKeydownHandler);
  document.removeEventListener('click', messageClickOutsideHandler);
  unblockSubmitButton();
}

const createMessage = (messageElement, closeButtonClass) => {
  document.body.append(messageElement);
  document.addEventListener('keydown', messageEscKeydownHandler);
  document.body.addEventListener('click', messageClickOutsideHandler);
  messageElement.querySelector(closeButtonClass).addEventListener('click', closeButtonClickHandler);
};

const createSuccessMessage = () => {
  createMessage(successMessage, '.success__button');
};

const createErrorMessage = () => {
  createMessage(errorMessage, '.error__button');
};

export {createSuccessMessage, createErrorMessage};
