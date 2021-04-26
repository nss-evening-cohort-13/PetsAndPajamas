import axios from 'axios';
import { baseUrl } from '../config.json';

const pajamaUrl = `${baseUrl}/pajamas`;

const getSingleOrder = (orderId) => new Promise((resolve, reject) => axios.get(`${pajamaUrl}/${orderId}`).then((response) => {
  resolve(response.data);
}).catch((error) => reject(error)));

export default { getSingleOrder };
