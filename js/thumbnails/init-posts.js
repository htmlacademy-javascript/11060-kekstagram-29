import {getData} from '../utils/api.js';
import {showAlert} from '../utils/util.js';
import {renderPosts} from './render-posts.js';
import {initFilter, getFilteringData} from './filters.js';

const GET_URL = 'https://29.javascript.pages.academy/kekstagram/data';

const getSuccess = (data) => {
  initFilter(data);
  renderPosts(getFilteringData(data));
};

const initPosts = () => {
  getData(GET_URL, getSuccess, showAlert);
};

export {initPosts};
