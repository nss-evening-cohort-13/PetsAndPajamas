import axios from 'axios';
import { baseUrl } from '../config.json';

const pajamaUrl = `${baseUrl}/pajamas`;

const getSinglePajama = (pajamaId) => new Promise((resolve, reject) => axios.get(`${pajamaUrl}/${pajamaId}`).then((response) => {
  resolve(response.data);
}).catch((error) => reject(error)));

export default { getSinglePajama };
