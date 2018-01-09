export default {
  state: {},
  mutations: {},
  actions: {},
  getters: {
    menu(state, getters, rootState) {
      return rootState.products.products.filter(product => product.inMenu === true);
    },
  },
};
