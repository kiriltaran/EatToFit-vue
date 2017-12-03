const products = state => state.products;

const menu = state => state.products.filter(product => product.inMenu === true);

const user = state => state.user;

const loading = state => state.loading;

const error = state => state.error;

export { products, menu, user, loading, error };
