import Vue from 'vue';
import VueRouter from '../vue-router-mine';
import Home from '../page/home';
import Blog from '../page/blog';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
];

const router = new VueRouter({ mode: 'hash', routes });

export default router;
