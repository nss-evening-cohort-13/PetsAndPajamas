import axios from 'axios';
import { baseUrl } from '../config.json';

const orderUrl = `${baseUrl}/CustomerOrders`;

const getById = (orderId) => new Promise((resolve, reject) => axios.get(`${orderUrl}/${orderId}`)
  .then((response) => { resolve(response.data); })
  .catch((error) => reject(error)));

export default getById;
