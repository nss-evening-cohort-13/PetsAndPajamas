import axios from 'axios';
import { baseUrl } from '../config.json';

const paymentUrl = `${baseUrl}/PaymentTypes`;

const addPaymentType = (payment) => new Promise((_resolve, reject) => axios.post(`${paymentUrl}`, payment)
  .catch((err) => reject(err)));

export default { addPaymentType };
