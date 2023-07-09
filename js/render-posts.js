import { createSimilarPosts } from './data.js';
import { openBigPicture } from './big-picture.js';

const thumbnailsList = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const thumbnails = createSimilarPosts();
const fragment = document.createDocumentFragment();

const createPost = (thumbnail) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  const img = thumbnailElement.querySelector('.picture__img');
  const likes = thumbnailElement.querySelector('.picture__likes');
  const comments = thumbnailElement.querySelector('.picture__comments');

  img.src = thumbnail.url;
  img.alt = thumbnail.description;
  likes.textContent = thumbnail.likes;
  comments.textContent = thumbnail.comments.length;

  return thumbnailElement;
};

const renderPosts = () => {
  thumbnails.forEach((thumbnail) => {
    const post = createPost(thumbnail);

    post.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(thumbnail);
    });

    fragment.append(post);
  });

  thumbnailsList.append(fragment);
};

export {renderPosts};
