import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

const SignoutContainer = () => import('../components/SignoutContainer.vue');
const MainContainer = () => import('../components/MainContainer.vue');
const StatsContainer = () => import('../components/StatsContainer.vue');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/signout',
      name: 'Выход',
      component: SignoutContainer,
      meta: {
        notCheckAuth: true,
      },
    },
    {
      path: '/',
      name: 'Главная',
      component: MainContainer,
      meta: {
        notCheckAuth: false,
      },
    },
    {
      path: '/stats',
      name: 'Статистика',
      component: StatsContainer,
      meta: {
        notCheckAuth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.notCheckAuth) {
    next();
  } else {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next();
      } else {
        next({
          path: '/signout',
        });
      }
    });
  }
});

export default router;
