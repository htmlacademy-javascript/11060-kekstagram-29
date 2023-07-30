const MAX_LENGTH = 140;
const REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_AMOUNT_MESSAGE = 'Хэштегов может быть не более пяти';
const HASHTAG_DUPLICATE_MESSAGE = 'Хэш-теги не должны повторяться';
const HASHTAG_ERROR_MESSAGE = 'Хэш-тег должен начинаться с символа #, не может состоять только из #, не более 20 символов';
const DESCRIPTION_LENGTH_MESSAGE = 'До 140 символов';

const form = document.querySelector('.img-upload__form');
const formDescriptionField = form.querySelector('.text__description');
const formHashtagField = form.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error',
});

const createHashtags = (value) => value.toLowerCase().trim().split(' ').filter((it) => it);
const checkHashtagBoolean = (hashtags) => hashtags.every((element) => REGEXP.test(element));
const checkHashtagUnique = (hashtags) => new Set(hashtags);

const validateHashtags = (value) => {
  const hashtags = createHashtags(value);
  const hashtagBoolean = checkHashtagBoolean(hashtags);
  const uniqueHashtags = checkHashtagUnique(hashtags);

  return (hashtagBoolean && hashtags.length <= 5 && hashtags.length === uniqueHashtags.size || value === '');
};

const getHashtagErrorMessage = (value) => {
  const hashtags = createHashtags(value);
  const hashtagBoolean = checkHashtagBoolean(hashtags);
  const uniqueHashtags = checkHashtagUnique(hashtags);

  if (!value) {
    return '';
  }

  if (hashtags.length > 5) {
    return HASHTAG_AMOUNT_MESSAGE;
  }

  if (hashtags.length !== uniqueHashtags.size) {
    return HASHTAG_DUPLICATE_MESSAGE;
  }

  if (!hashtagBoolean) {
    return HASHTAG_ERROR_MESSAGE;
  }
};

const validateDescription = (value) => value.length <= MAX_LENGTH;

const addValidator = () => {
  pristine.addValidator(formHashtagField, validateHashtags, getHashtagErrorMessage, 1, true);
  pristine.addValidator(formDescriptionField, validateDescription, DESCRIPTION_LENGTH_MESSAGE);
};

const validateByPristine = () => pristine.validate();
const resetPristine = () => pristine.reset();

export { addValidator, validateByPristine, resetPristine };
