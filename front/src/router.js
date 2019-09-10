import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Board from './views/Board.vue';
import Write from './views/Write.vue';
import Update from './views/Update.vue';
import BoardContent from './views/BoardContent.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/board',
      name: 'board',
      component: Board,
    },
    {
      path: '/write',
      name: 'write',
      component: Write,
    },
    {
      path: '/update',
      name: 'update',
      component: Update,
    },
    {
      path: '/boardcontent',
      name: 'boardcontent',
      component: BoardContent,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
