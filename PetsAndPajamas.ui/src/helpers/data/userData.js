import axios from 'axios';
import { baseUrl } from '../config.json';

const userUrl = `${baseUrl}/siteUsers`;

const getUserByUid = (fbUid) => new Promise((resolve, reject) => {
  axios.get(`${userUrl}/${fbUid}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export default { getUserByUid };
