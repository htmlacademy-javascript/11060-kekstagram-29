import {renderBigPicture} from './render-big-picture.js';
import {getData} from '../utils/api.js';
import {showAlert} from '../utils/util.js';

const GET_URL = 'https://29.javascript.pages.academy/kekstagram/data';

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

const createPosts = (posts) => {
  posts.forEach((post)=> {
    thumbnailsList.append(createPost(post));
  });
};

const renderPosts = () => getData(GET_URL, createPosts, showAlert);

export {renderPosts};
