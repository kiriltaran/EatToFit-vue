import * as firebase from 'firebase';

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
    setProducts({
      commit
    }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('products')
        .once('value')
        .then(data => {
          const products = [];
          const obj = data.val();
          Object.keys(obj).forEach(key => {
            products.push({
              id: key,
              title: obj[key].title,
              cal: obj[key].cal,
              creatorId: obj[key].creatorId,
              inMenu: false,
            });
          });
          commit('setProducts', products);
          commit('setLoading', false);
        })
        .catch(error => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    createProduct({
      commit,
      getters,
      dispatch
    }, payload) {
      commit('setLoading', true);
      const product = {
        title: payload.title,
        cal: payload.cal,
        creatorId: getters.user.id,
      };
      firebase
        .database()
        .ref('products')
        .push(product)
        .then(data => {
          const {
            key
          } = data;
          commit('createProduct', {
            ...product,
            id: key,
          });
          dispatch('setProducts');
          commit('setLoading', false);
        })
        .catch(error => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    toggleInMenu({
      commit
    }, payload) {
      commit('toggleInMenu', payload);
    },
  },
  getters: {
    products(state) {
      return state.products;
    },
  },
};