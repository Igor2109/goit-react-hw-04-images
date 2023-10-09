import axios from 'axios';
const API_KEY = '38948286-ca97297e9309afc5c94bc1b14';
const API_URL = `https://pixabay.com/api/`;

export const handleSearch = async (query, page) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: query,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
