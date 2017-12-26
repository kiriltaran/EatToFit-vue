const setProducts = (state, payload) => {
  state.products = payload;
};
const createProduct = (state, payload) => {
  state.products.push(payload);
};
const inMenuToggle = (state, payload) => {
  const toggledElement = state.products.find(element => element.id === payload);
  toggledElement.inMenu = !toggledElement.inMenu;
};
const setUser = (state, payload) => {
  state.user = payload;
};
const setLoading = (state, payload) => {
  state.loading = payload;
};
const setError = (state, payload) => {
  state.error = payload;
};
const clearError = state => {
  state.error = null;
};
const clearProducts = state => {
  state.products = [];
};

export {
  setProducts,
  createProduct,
  inMenuToggle,
  setUser,
  setLoading,
  setError,
  clearError,
  clearProducts,
};
