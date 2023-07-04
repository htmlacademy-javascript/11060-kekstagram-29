import { createSimilarPosts } from './data.js';

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
  fragment.append(thumbnailElement);
};

const renderPosts = () => {
  thumbnails.forEach((thumbnail) => createPost(thumbnail));
  thumbnailsList.append(fragment);
};

export {renderPosts};
