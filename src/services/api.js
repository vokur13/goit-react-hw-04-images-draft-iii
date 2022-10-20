import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '29248542-cea93977a5234fa0e2d1b3dfd';
// const API_KEY = '248542-cea93977a5234fa0e2d1b3dfd';

const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
});

export const getGallery = async (query, page, perPage) => {
  const { data } = await axios.get(
    `/?q=${query}&page=${page}&per_page=${perPage}&${searchParams}`
  );
  return data;
};
