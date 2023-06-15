import VueCookies from 'vue-cookies'
import axios from 'axios'
import router from '@/router';

import store from '@/store';


const api = axios.create({
  baseURL: `${process.env.VUE_APP_BACKEND_URL}/api`
})

api.interceptors.request.use(config => {
  config.headers['Authorization'] = VueCookies.get('token')
  //if (VueCookies.get('token')) {
  //  config.headers.common['Authorization'] = VueCookies.get('token')
  //}
  return config
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    //console.log(error)
    //console.log(VueCookies.get('token'))
    if (error.response.status === 401) {
      VueCookies.remove('token');
      console.log(router.currentRoute.fullPath);

      if (router.currentRoute.fullPath !== '/') {
        router.push('/');
      }
      return error;
    } else if (
      error.response.status === 403 ||
      error.response.status === 429
    ) {
      store.dispatch('logout');
      return error;
    } else if (error.response.status === 400) {
      store.dispatch('alertBad', error.response.data.errors[0]);
      //Vue.swal({
      //  icon: 'error',
      //  title: 'Oops...',
      //  text: error.response.data.errors[0],
      //  confirmButtonText: 'Ok',
      //  confirmButtonColor: '#007bff',
      //});
      return new Promise((resolve, reject) => {
        reject(error);
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);

export { api }