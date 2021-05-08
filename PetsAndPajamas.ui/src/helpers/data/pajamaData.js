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

const getCatPajamas = () => new Promise((resolve, reject) => axios
  .get(`${pajamaUrl}/cat`)
  .then((res) => resolve(res.data))
  .catch((err) => reject(err)));

const getDogPajamas = () => new Promise((resolve, reject) => axios
  .get(`${pajamaUrl}/dog`)
  .then((response) => resolve(response.data))
  .catch((error) => reject(error)));

const getLatestPajamas = () => new Promise((resolve, reject) => axios
  .get(`${pajamaUrl}/new`)
  .then((res) => resolve(res.data))
  .catch((err) => reject(err)));

const updatePajama = (id, pajama) => axios
  .put(`${pajamaUrl}/${id}`, pajama)
  .catch((err) => console.warn(err));

const getAllPajamas = () => new Promise((resolve, reject) => axios
  .get(`${pajamaUrl}`)
  .then((response) => resolve(response.data))
  .catch((err) => reject(err)));

const addPajama = (pajama) => axios.post(`${pajamaUrl}`, pajama).catch((err) => console.warn(err));

export default {
  getSinglePajama,
  getDogPajamas,
  getCatPajamas,
  getSearchedPajamas,
  getLatestPajamas,
  updatePajama,
  getAllPajamas,
  addPajama
};
