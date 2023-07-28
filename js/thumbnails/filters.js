import {shuffleArray, debounce} from '../utils/util.js';
import { renderPosts } from './render-posts.js';

const SHUFFLED_DATA_LENGTH = 10;
const RERENDER_DELAY = 500;
const FILTER_DEFAULT = 'filter-default';
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFiltersButtons = document.querySelectorAll('.img-filters__button');

const activeButtonToggle = (target) => {
  imgFiltersButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
  target.classList.add('img-filters__button--active');
};

const removePictures = () => {
  document.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

const showFilterButtons = () => imgFilters.classList.remove('img-filters--inactive');

const getFilteringData = (data, evt) => {
  if (!evt || evt.target.id === FILTER_DEFAULT) {
    return data;
  }

  if (evt.target.id === FILTER_RANDOM) {
    return shuffleArray(data.slice()).slice(0, SHUFFLED_DATA_LENGTH);
  }

  if (evt.target.id === FILTER_DISCUSSED) {
    return data.slice().sort((a, b) => b.comments.length - a.comments.length);
  }
};

const setDelayRender = debounce((data, evt) => {
  removePictures();
  renderPosts(getFilteringData(data, evt));
}, RERENDER_DELAY);

const initFilter = (data) => {
  showFilterButtons();

  imgFiltersForm.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (evt.target.closest('.img-filters__button')) {
      activeButtonToggle(evt.target);
      setDelayRender(data, evt);
    }
  });
};

export {initFilter, getFilteringData};
