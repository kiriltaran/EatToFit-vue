import Vue from 'vue';
import Vuex from 'vuex';

import menu from './menu';
import products from './products';
import user from './user';
import shared from './shared';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    menu,
    products,
    user,
    shared,
  },
});

export default store;
