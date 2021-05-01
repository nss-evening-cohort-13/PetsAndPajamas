import axios from 'axios';
import { baseUrl } from '../config.json';

const pajamaOrderUrl = `${baseUrl}/PajamaOrders`;

const getSinglePajamaOrder = (pajamaId, orderId) => new Promise((resolve, reject) => {
  axios.get(`${pajamaOrderUrl}/${pajamaId}/${orderId}`)
    .then((response) => {
      resolve(response.data);
    }).catch((error) => reject(error));
});

const createPajamaOrder = (pajamaOrder) => axios.post(`${pajamaOrderUrl}`, pajamaOrder);

const updatePajamaOrder = (pajamaOrderId, newPajamaOrder) => new Promise((_resolve, reject) => axios.put(`${pajamaOrderUrl}/${pajamaOrderId}`, newPajamaOrder)
  .catch((err) => reject(err)));

export default { createPajamaOrder, getSinglePajamaOrder, updatePajamaOrder };
