import {createUniqueRandomIntegerGenerator} from './util.js';

const RANDOM_PHOTOS_COUNT = 10;

const photoFilters = document.querySelector('.img-filters');
const photoFiltersWrapper = photoFilters.querySelector('.img-filters__form');

let currentFilterButton = photoFiltersWrapper.querySelector('.img-filters__button--active');
let currentFilter = currentFilterButton.id;

const showPhotoFilters = () => {
  photoFilters.classList.remove('img-filters--inactive');
};

const getUniqueRandomPhotos = (photos, count) => {
  const randomPhotos = [];
  const getRandomPhotoNumber = createUniqueRandomIntegerGenerator(0, photos.length - 1);

  for (let i = 0; i < count; i++) {
    randomPhotos.push(photos[getRandomPhotoNumber()]);
  }

  return randomPhotos;
};

const comparePhotos = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getSortedPhotos = (photos) => {
  return photos.slice().sort(comparePhotos);
};

const filterPhotos = (photos, option, clear, render) => {
  switch(option) {
    case 'filter-random':
      clear();
      render(getUniqueRandomPhotos(photos, RANDOM_PHOTOS_COUNT));
      break;
    case 'filter-discussed':
      clear();
      render(getSortedPhotos(photos));
      break;
    default:
      clear();
      render(photos);
  }
}

const setPhotoFilterButtonClick = (photoDescriptions, clear, render) => {

  photoFiltersWrapper.addEventListener('click', (evt) => {
    if (evt.target.className === 'img-filters__button') {
      currentFilterButton.classList.remove('img-filters__button--active');
      currentFilterButton = evt.target;
      currentFilterButton.classList.add('img-filters__button--active');
      currentFilter = currentFilterButton.id;

      filterPhotos(photoDescriptions, currentFilter, clear, render);
    }
  });
};

export {showPhotoFilters, setPhotoFilterButtonClick};
