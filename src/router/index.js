import Vue from 'vue';
import Router from 'vue-router';

import MainContainer from '../components/MainContainer.vue';
import StatsContainer from '../components/StatsContainer.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Главная',
      component: MainContainer,
    },
    {
      path: '/stats',
      name: 'Статистика',
      component: StatsContainer,
    },
  ],
});

export default router;
