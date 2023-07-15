import axios from 'axios';

export const urlHost = 'https://backend-loyalty.vercel.app';

export const fetchAPI = async ({url = '', method = 'GET', data = {}}) => {
  return axios({
    method: method,
    url: url,
    data: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  })
    .then(res => {
      // console.log('[CALL API SUCCESS]: ', url, res.data);
      return res.data;
    })
    .catch(error => {
      // console.log('[CALL API FAILED]: ', url, error);
      return error.response;
    });
};
