import axios from 'axios';
import { baseUrl } from '../config.json';

const orderUrl = `${baseUrl}/CustomerOrders`;

const getByUserId = (userId) => new Promise((resolve, reject) => axios.get(`${orderUrl}/${userId}`)
  .then((response) => { resolve(response.data[0]); })
  .catch((error) => reject(error)));

const updateOrder = (orderId, newOrder) => new Promise((resolve, reject) => axios.put(`${orderUrl}/${orderId}`, newOrder)
  .catch((err) => reject(err)));

export default { getByUserId, updateOrder };
