import { getRandomInteger, getRandomArrayElement, shuffleArray } from './util.js';

const NUMBER_OF_POSTS = 25;

const DESCRIPTIONS = [
  'Извините, был напуган',
  'Фотографа обидеть может каждый',
  'Сам сделай лучше, умник'
];

const NAMES = [
  'Нагибатор2000',
  'Розовый Пендальф',
  'Бэтмент',
  'Василий',
  'Акробатюшка',
  'Бубочка',
  'Пепсиколя'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

let postId = 1;
let commentId = 1;

const createCommentMessage = (elements) => shuffleArray(elements).slice(0, getRandomInteger(1, 2)).join(' ');

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createCommentMessage(COMMENTS),
  name: getRandomArrayElement(NAMES)
});

const createPost = () => ({
  id: postId,
  url: `photos/${postId++}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComment)
});

const createSimilarPosts = () => Array.from({ length: NUMBER_OF_POSTS }, createPost);

export { createSimilarPosts };
