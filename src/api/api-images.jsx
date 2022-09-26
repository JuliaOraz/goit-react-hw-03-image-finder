import axios from 'axios';

const API_KEY = '29177947-674c6129c973bef5742ba95fc';
const BASE_URL = `https://pixabay.com/api`;
const instance = axios.create({
  baseUrl: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const getImages = async (searchImage, page = 1) => {
  const { data } = await instance.get(BASE_URL, {
    params: {
      page,
      q: searchImage,
    },
  });
  return data;
};
