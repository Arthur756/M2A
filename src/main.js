import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueMask from 'v-mask';
import axios from 'axios';
import Toast from './plugins/toast';
import UUID from 'vue-uuid';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000'
});

Vue.prototype.$axios = axiosInstance;

Vue.config.productionTip = false;

Vue.use(VueMask);
Vue.use(Toast);
Vue.use(UUID);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
