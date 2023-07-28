import {renderBigPicture} from './render-big-picture.js';

const thumbnailsList = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPost = (thumbnail) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  const img = thumbnailElement.querySelector('.picture__img');
  const likes = thumbnailElement.querySelector('.picture__likes');
  const comments = thumbnailElement.querySelector('.picture__comments');

  img.src = thumbnail.url;
  img.alt = thumbnail.description;
  likes.textContent = thumbnail.likes;
  comments.textContent = thumbnail.comments.length;

  thumbnailElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderBigPicture(thumbnail);
  });

  return thumbnailElement;
};

const renderPosts = (posts) => {
  posts.forEach((post) => {
    thumbnailsList.append(createPost(post));
  });
};

export {renderPosts};
