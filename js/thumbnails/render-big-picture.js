import { isEscapeKey } from '../utils/util.js';

const COMMENTS_COUNTER = 5;

const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const commentsList = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');
const commentTemplate = document.querySelector('.social__comment');

let visibleComments = 5;
let commentsFromData = [];

const closeBigPicture = () => closeModal();

const createComment = (thumbnail) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = thumbnail.avatar;
  commentElement.querySelector('.social__picture').alt = thumbnail.name;
  commentElement.querySelector('.social__text').textContent = thumbnail.message;
  return commentElement;
};

const setCloseButtonShow = () => {
  if (commentsFromData.length <= visibleComments) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
};

const renderComments = () => {
  setCloseButtonShow();
  if (commentsFromData.length <= COMMENTS_COUNTER) {
    commentsFromData.forEach((element) => commentsList.append(createComment(element)));
  } else {
    commentsFromData.slice(0, visibleComments).forEach((element) => commentsList.append(createComment(element)));
  }
};

const fillCommentsListCounts = () => {
  socialCommentsCount.innerHTML = `${Math.min(visibleComments, commentsFromData.length)} из <span class="comments-count">${commentsFromData.length}</span> комментариев`;
};

const commentsLoaderButtonClickHandler = () => {
  commentsList.innerHTML = '';
  visibleComments += COMMENTS_COUNTER;
  setCloseButtonShow();
  fillCommentsListCounts();
  commentsFromData.slice(0, visibleComments).forEach((element) => commentsList.append(createComment(element)));
};

const fillBigPicture = (thumbnail) => {
  commentsList.innerHTML = '';
  bigPictureImg.src = thumbnail.url;
  bigPictureImg.alt = thumbnail.description;
  bigPictureLikes.textContent = thumbnail.likes;
  fillCommentsListCounts();
  renderComments(thumbnail.comments);
  bigPictureDescription.textContent = thumbnail.description;
};

const popupEscKeydownHandler = (evt) => {
  if (isEscapeKey && !evt.target.closest('.social__footer-text')) {
    evt.preventDefault();
    closeModal();
  }
};

const closeButtonClickHandler = () => closeBigPicture();

function openModal() {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', popupEscKeydownHandler);
  closeButton.addEventListener('click', closeButtonClickHandler);
}

function closeModal() {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', popupEscKeydownHandler);
  closeButton.removeEventListener('click', closeButtonClickHandler);
  visibleComments = COMMENTS_COUNTER;
}

const renderBigPicture = (thumb) => {
  commentsFromData = thumb.comments;
  fillBigPicture(thumb);
  openModal();
  commentsLoaderButton.addEventListener('click', commentsLoaderButtonClickHandler);
};

export { renderBigPicture };
