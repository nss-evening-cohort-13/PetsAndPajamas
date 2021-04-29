import axios from 'axios';
import { baseUrl } from '../config.json';

const pajamaUrl = `${baseUrl}/pajamas`;

const getSingleOrder = (orderId) => new Promise((resolve, reject) => axios.get(`${pajamaUrl}/${orderId}`).then((response) => {
  resolve(response.data);
}).catch((error) => reject(error)));

const orderUrl = `${baseUrl}/CustomerOrders`;

const getByUserId = (userId) => new Promise((resolve, reject) => axios.get(`${orderUrl}/${userId}`)
  .then((response) => { resolve(response.data[0]); })
  .catch((error) => reject(error)));

const updateOrder = (orderId, newOrder) => new Promise((resolve, reject) => axios.put(`${orderUrl}/${orderId}`, newOrder)
  .catch((err) => reject(err)));

export default { getByUserId, updateOrder, getSingleOrder };
