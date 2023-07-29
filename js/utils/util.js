const ALERT_SHOW_TIME = 5000;
const ALERT_MESSAGE = 'Не удалось загрузить данные. Попробуйте обновить страницу';
const BLOCKED_BUTTON_TEXT = 'Публикую...';
const UNBLOCKED_BUTTON_TEXT = 'Опубликовать';

const submitButton = document.querySelector('.img-upload__submit');

const shuffleArray = (elements) => {
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = elements[i];
    elements[i] = elements[j];
    elements[j] = temp;
  }

  return elements;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-message');
  alertContainer.textContent = ALERT_MESSAGE;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = BLOCKED_BUTTON_TEXT;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = UNBLOCKED_BUTTON_TEXT;
};

export { shuffleArray, isEscapeKey, showAlert, blockSubmitButton, unblockSubmitButton };
