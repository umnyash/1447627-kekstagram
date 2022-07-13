import {getRandomInteger, getRandomArrayItem, createUniqueRandomIntegerGenerator} from './util.js';

const PHOTOS_AMOUNT = 25;
const AVATARS_AMOUNT = 6;

const Likes = {
  MIN_AMOUNT: 15,
  MAX_AMOUNT: 200,
};

const Comments = {
  MIN_AMOUNT: 1,
  MAX_AMOUNT: 6,
  MIN_ID: 1,
  MAX_ID: 999,
};

const DESCRIPTIONS = [
  'Закат на море',
  'Суши-кот',
  'Хор',
  'Краб',
  'Концерт',
];

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

// Функция для создания одного комментария

const createComment = (id) => {
  return {
    id,
    avatar: `img/avatar-${getRandomInteger(1, AVATARS_AMOUNT)}.svg`,
    message: getRandomArrayItem(MESSAGES),
    name: getRandomArrayItem(NAMES),
  }
};

// Функция для создания нескольких комментариев

const createComments = (amount) => {
  const getRandomId = createUniqueRandomIntegerGenerator(Comments.MIN_ID, Comments.MAX_ID);
  let comments = [];

  for (let i = 0; i < amount; i++) {
    comments.push(createComment(getRandomId()));
  }

  return comments;
};

// Функция для создания объекта с данными о фотографии

const createPhotoDescription = (id, url) => {
  return {
    id,
    url,
    description: getRandomArrayItem(DESCRIPTIONS),
    likes: getRandomInteger(Likes.MIN_AMOUNT, Likes.MAX_AMOUNT),
    comments: createComments(getRandomInteger(Comments.MIN_AMOUNT, Comments.MAX_AMOUNT)),
  }
}

// Функция для создания массива объектов с данными о фотографиях

const createPhotoDescriptions = () => {
  let photoDescriptions = [];

  for (let i = 1; i <= PHOTOS_AMOUNT; i++) {
    photoDescriptions.push(createPhotoDescription(i, `photos/${i}.jpg`));
  }

  return photoDescriptions;
}

// Создание описаний фотографий

const photoDescriptions = createPhotoDescriptions();

export {photoDescriptions};
