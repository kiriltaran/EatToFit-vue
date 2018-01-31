import Vue from 'vue';
import Router from 'vue-router';

import MainComponent from '../components/MainComponent.vue';
import StatsComponent from '../components/StatsComponent.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Главная',
      component: MainComponent,
    },
    {
      path: '/stats',
      name: 'Статистика',
      component: StatsComponent,
    },
  ],
});

export default router;