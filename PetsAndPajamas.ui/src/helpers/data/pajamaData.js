import axios from 'axios';
import { baseUrl } from '../config.json';

const pajamaUrl = `${baseUrl}/pajamas`;

const getSearchedPajamas = (searchTerm) => new Promise((resolve, reject) => axios
  .get(`${pajamaUrl}`).then((response) => {
    const searched = response.data.filter((pajama) => pajama.title.toLowerCase().includes(searchTerm));
    resolve(searched);
  }).catch((error) => reject(error)));

const getSinglePajama = (pajamaId) => new Promise((resolve, reject) => axios.get(`${pajamaUrl}/${pajamaId}`).then((response) => {
  resolve(response.data);
}).catch((error) => reject(error)));

const getDogPajamas = () => new Promise((resolve, reject) => axios
  .get(`${pajamaUrl}/dog`)
  .then((response) => resolve(response.data))
  .catch((error) => reject(error)));

export default { getSinglePajama, getDogPajamas, getSearchedPajamas };
