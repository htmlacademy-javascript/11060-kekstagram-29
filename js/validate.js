const MAX_LENGTH = 140;
const REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const form = document.querySelector('.img-upload__form');
const formDescriptionField = form.querySelector('.text__description');
const formHashtagField = form.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error',
});

const validateHashtags = (value) => {
  const hashtags = value.trim().split(' ');
  const hashtagBoolean = hashtags.every((element) => REGEXP.test(element));
  const uniqueHashtags = new Set(hashtags);

  return (hashtagBoolean && hashtags.length <= 5 && hashtags.length === uniqueHashtags.size);
};

const getHashtagErrorMessage = (value) => {
  const hashtags = value.trim().split(' ');
  const hashtagBoolean = hashtags.every((element) => REGEXP.test(element));
  const uniqueHashtags = new Set(hashtags);

  if (!value) {
    return '';
  }

  if (hashtags.length > 5) {
    return 'Хэштегов может быть не более пяти';
  }

  if (hashtags.length !== uniqueHashtags.size) {
    return 'Хэш-теги не должны повторяться';
  }

  if (!hashtagBoolean) {
    return 'Хэш-тег должен начинаться с символа #, не может состоять только из одной решётки, максимальная длина одного хэш-тега 20 символов';
  }
};

const validateDescription = (value) => value.length <= MAX_LENGTH;

const getDescriptionErrorMessage = () => 'До 140 символов';

pristine.addValidator(formHashtagField, validateHashtags, getHashtagErrorMessage);
pristine.addValidator(formDescriptionField, validateDescription, getDescriptionErrorMessage);

export {pristine};
