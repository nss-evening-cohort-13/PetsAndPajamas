import axios from 'axios';
import baseUrl from '../config.json';

const pajamaTypeUrl = `${baseUrl}/pajamatypes`;

const getPajamaTypes = () => new Promise((resolve, reject) => axios
  .get(`${pajamaTypeUrl}`)
  .then((res) => resolve(res.data))
  .catch((err) => (reject(err))));

export default { getPajamaTypes };
