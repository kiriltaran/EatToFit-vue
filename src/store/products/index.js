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
      const toggledProduct = state.products.find(element => element.id === payload);
      toggledProduct.inMenu = !toggledProduct.inMenu;
    },
    changeWeight(state, payload) {
      const changedProduct = state.products.find(element => element.id === payload.id);
      changedProduct.weight = payload.weight;
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
            photo: productsStore[key].photo,
            inMenu: false,
            weight: 100,
          });
        });
        commit('setProducts', products);
        commit('setLoading', false);
      } catch (e) {
        window.console.log(e);
        commit('setLoading', false);
      }
    },
    async createProduct({ commit, getters }, payload) {
      commit('setLoading', true);
      try {
        const product = {
          title: payload.title,
          cal: payload.cal,
          prot: payload.cal,
          fat: payload.fat,
          carbo: payload.carbo,
          photo: payload.photo,
          creatorId: getters.user.id,
        };
        const { key } = await api.createProduct(product);

        commit('createProduct', {
          ...product,
          id: key,
          inMenu: false,
          weight: 100,
        });
        commit('setLoading', false);
      } catch (e) {
        window.console.log(e);
        commit('setLoading', false);
      }
    },
    toggleInMenu({ commit }, payload) {
      commit('toggleInMenu', payload);
    },
    changeWeight({ commit }, payload) {
      commit('changeWeight', payload);
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
