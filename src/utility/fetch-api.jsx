import PropTypes from 'prop-types';
import axios from 'axios';
const API_KEY = '37780751-c0706f5026557b01bc2eaa9ec';
axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = API_KEY;
// axios.defaults.params = {
//   key: API_KEY,
//   image_type: 'photo',
//   orientation: 'horizontal',
//   per_page: 12,
// };

export const getDataQuery = async (searchData, page = 1) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    q: searchData,
    page: page,
  });
  const dataAPI = await axios.get(`?${searchParams}`);
  //   const dataAPI = await axios.get(`?q=${searchData}&page=${page}`);
  return dataAPI.data.hits;
};

getDataQuery.propType = {
  searchData: PropTypes.string.isRequired,
  page: PropTypes.string,
};
