const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureSocialCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoaderButton = bigPicture.querySelector('.social__comments-loader');

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const fragment = document.createDocumentFragment();

const createComment = (thumbnail) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = thumbnail.avatar;
  commentElement.querySelector('.social__text').textContent = thumbnail.message;
  fragment.append(commentElement);
};

const renderComments = (commentsArray) => {
  commentsArray.forEach((element) => createComment(element));
  bigPictureCommentsList.append(fragment);
};

const createBigPicture = (thumbnail) => {
  bigPictureImg.src = thumbnail.url;
  bigPictureImg.alt = thumbnail.description;
  bigPictureLikes.textContent = thumbnail.likes;
  bigPictureCommentsCount.textContent = thumbnail.comments.length;
  bigPictureCommentsList.innerHTML = '';
  renderComments(thumbnail.comments);
  bigPictureDescription.textContent = thumbnail.description;
};

const onPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture (thumb) {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureSocialCommentsCount.classList.add('hidden');
  bigPictureCommentsLoaderButton.classList.add('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);

  createBigPicture(thumb);
}

function closeBigPicture () {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

bigPictureCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeBigPicture();
});

export {openBigPicture};
