import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import store from './store'
//import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify/lib'
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';
import './assets/scss/main.scss'

Vue.use(Vuelidate);
Vue.use(VueCookies);
Vue.use(VueSweetalert2);
Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#0e2b63',
      },
      dark: {
        primary: '#0e2b63',
      }
    },
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
