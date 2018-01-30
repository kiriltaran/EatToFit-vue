import api from '../../api';

/* eslint-disable no-param-reassign */
export default {
  state: {
    products: [],
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
    createProduct(state, payload) {
      state.products.push(payload);
    },
    clearProducts(state) {
      state.products = [];
    },
    toggleInMenu(state, payload) {
      const toggledElement = state.products.find(element => element.id === payload);
      toggledElement.inMenu = !toggledElement.inMenu;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('setLoading', true);
      try {
        const productsStore = await api.fetchProducts();
        const products = [];
        Object.keys(productsStore).forEach(key => {
          products.push({
            id: key,
            title: productsStore[key].title,
            cal: productsStore[key].cal,
            prot: productsStore[key].prot,
            fat: productsStore[key].fat,
            carbo: productsStore[key].carbo,
            creatorId: productsStore[key].creatorId,
            inMenu: false,
          });
        });
        commit('setProducts', products);
        commit('setLoading', false);
      } catch (e) {
        window.console.log(e);
        commit('setLoading', false);
      }
    },
    async createProduct({ commit, getters, dispatch }, payload) {
      commit('setLoading', true);
      try {
        const product = {
          title: payload.title,
          cal: payload.cal,
          prot: payload.cal,
          fat: payload.fat,
          carbo: payload.carbo,
          creatorId: getters.user.id,
        };
        const { key } = await api.createProduct(product);

        commit('createProduct', {
          ...product,
          id: key,
        });
        dispatch('fetchProducts');
        commit('setLoading', false);
      } catch (e) {
        window.console.log(e);
        commit('setLoading', false);
      }
    },
    toggleInMenu({ commit }, payload) {
      commit('toggleInMenu', payload);
    },
  },
  getters: {
    products(state) {
      return state.products;
    },
    menu(state) {
      return state.products.filter(product => product.inMenu);
    },
  },
};
