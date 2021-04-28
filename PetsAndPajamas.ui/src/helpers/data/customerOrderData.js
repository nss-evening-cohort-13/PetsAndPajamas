import axios from 'axios';
import { baseUrl } from '../config.json';

const orderUrl = `${baseUrl}/CustomerOrders`;

const getByUserId = (userId) => new Promise((resolve, reject) => axios.get(`${orderUrl}/${userId}`)
  .then((response) => { resolve(response.data[0]); })
  .catch((error) => reject(error)));

export default { getByUserId };
