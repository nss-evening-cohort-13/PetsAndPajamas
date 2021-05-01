import axios from 'axios';
import { baseUrl } from '../config.json';

const pajamaOrderUrl = `${baseUrl}/PajamaOrders`;

const getSinglePajamaOrder = (orderId) => ((resolve, reject) => {
  axios.get(`${pajamaOrderUrl}/${orderId}`)
    .then((response) => {
      resolve(response.data);
    }).catch((error) => reject(error));
});

const createPajamaOrder = (pajamaOrder) => axios.post(`${pajamaOrderUrl}`, pajamaOrder);

const deleteCartItem = (pajamaId, orderId) => axios.delete(`${pajamaOrderUrl}/${pajamaId}/${orderId}`);

export default { createPajamaOrder, getSinglePajamaOrder, deleteCartItem };
