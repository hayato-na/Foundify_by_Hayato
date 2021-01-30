import Vue from 'vue';
import VueRouter from 'vue-router';
import Comments from '../views/Comments.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import MyPage from '../views/MyPage.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Comments',
    component: Comments,
    props: (route) => ({
      routeParams: route.query,
    }),
    beforeEnter: (to, from, next) => {
      if (store.getters.idToken) {
        next();
      } else {
        next('/login');
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters.idToken) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (store.getters.idToken) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage,
    beforeEnter: (to, from, next) => {
      if (store.getters.idToken) {
        next();
      } else {
        next('/login');
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
