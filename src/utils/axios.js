import Axios from 'axios';

let axios = Axios.create({ withCredentials: true });

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  function (response) {
    //alert (response.data.data.token);
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      //alert('Unauthorized');
    } 
    return Promise.reject(error);
  }
);

export default axios;