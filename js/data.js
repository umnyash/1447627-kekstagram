import {getRandomInt, getRandomArrayItem, checkLength} from './util.js';

const PHOTOS_AMOUNT = 25;
const AVATARS_AMOUNT = 6;
const LIKES_MIN_AMOUNT = 15;
const LIKES_MAX_AMOUNT = 200;
const COMMENTS_MIN_AMOUNT = 1;
const COMMENTS_MAX_AMOUNT = 6;
const COMMENT_MIN_ID = 1;
const COMMENT_MAX_ID = 999;

const NAMES = [
  'Роман',
  'Егор',
  'Хомяк',
  'Александр',
  'Захар',
  'Иван',
  'Антон',
  'Владимир',
  'Михаил',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const checkDuplicate = (value, array) => {
  return array.some((item) => value === item);
};

const getNewRandomId = () => {
  let id = getRandomInt(COMMENT_MIN_ID, COMMENT_MAX_ID);

  if (checkDuplicate(id, commentIds)) {
    return getNewRandomId();
  } else {
    commentIds.push(id);
    return id;
  }
};

const createComment = () => {
  return {
    id: getNewRandomId(),
    avatar: `img/avatar-${getRandomInt(1, AVATARS_AMOUNT)}`,
    message: getRandomArrayItem(MESSAGES),
    name: getRandomArrayItem(NAMES),
  }
};

const createSomeComments = (amount) => {
  let someComments = [];

  for (let i = 0; i < amount; i++) {
    someComments.push(createComment());
  }

  return someComments;
};

const createPhotoDescription = (id, url) => {
  return {
    id,
    url,
    description: 'Описание фотографии',
    likes: getRandomInt(LIKES_MIN_AMOUNT, LIKES_MAX_AMOUNT),
    comments: createSomeComments(getRandomInt(COMMENTS_MIN_AMOUNT, COMMENTS_MAX_AMOUNT)),
  }
}

let commentIds = [];
let photoDescriptions = [];

for (let i = 1; i <= PHOTOS_AMOUNT; i++) {
  photoDescriptions.push(createPhotoDescription(i, `photos/${i}.jpg`));
}

checkLength('Умняш', 6);
