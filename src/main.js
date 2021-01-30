import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/tailwind.css';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'https://firestore.googleapis.com/v1/projects/portfolio01-6f138/databases/(default)/documents';
axios.interceptors.request.use(
  (config) => {
    console.log(config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
axios.interceptors.response.use(
  (config) => {
    console.log(config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

store.dispatch('autoLogin').then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});
