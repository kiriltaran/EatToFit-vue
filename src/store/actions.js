import firebase from 'firebase';

import bus from '../main';

const loadProducts = ({ commit }) => {
  commit('setLoading', true);
  firebase
    .database()
    .ref('products')
    .once('value')
    .then(data => {
      const products = [];
      const obj = data.val();
      for (let key in obj) {
        products.push({
          id: key,
          title: obj[key].title,
          cal: obj[key].cal,
          inMenu: false,
        });
      }
      commit('setProducts', products);
      commit('setLoading', false);
    })
    .catch(error => {
      console.log(error);
      commit('setLoading', false);
    });
};

const createProduct = ({ commit, getters, dispatch }, payload) => {
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
      const { key } = data;
      commit('createProduct', {
        ...product,
        id: key,
      });
      dispatch('loadProducts');
      commit('setLoading', false);
    })
    .catch(error => {
      console.log(error);
      commit('setLoading', false);
    });
};

const inMenuToggle = ({ commit }, payload) => {
  commit('inMenuToggle', payload);
};

const signUpUser = ({ commit }, payload) => {
  commit('setLoading', true);
  commit('clearError');
  firebase
    .auth()
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(user => {
      user
        .updateProfile({
          displayName: payload.name,
        })
        .then(() => {
          const newUser = {
            id: user.uid,
            displayName: user.displayName,
          };
          commit('setLoading', false);
          commit('setUser', newUser);
          bus.$emit('show-auth', false);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    })
    .catch(error => {
      commit('setLoading', false);
      commit('setError', error);
      console.log(error);
    });
};

const signInUser = ({ commit, dispatch }, payload) => {
  commit('setLoading', true);
  commit('clearError');
  firebase
    .auth()
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(user => {
      commit('setLoading', false);
      commit('setUser', {
        id: user.uid,
        displayName: user.displayName,
      });
      dispatch('loadProducts');
      bus.$emit('show-auth', false);
    })
    .catch(error => {
      commit('setLoading', false);
      commit('setError', error);
      console.log(error);
    });
};
const autoSignIn = ({ commit, dispatch }, payload) => {
  commit('setUser', {
    id: payload.id,
    displayName: payload.displayName,
    photoURL: payload.photoURL,
  });
  dispatch('loadProducts');
};
const signInByGithub = ({ commit, dispatch }) => {
  commit('setLoading', true);
  commit('clearError');
  const provider = new firebase.auth.GithubAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      console.log(result);
      const newUser = {
        id: result.user.uid,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      };
      commit('setLoading', false);
      commit('setUser', newUser);
      dispatch('loadProducts');
      bus.$emit('show-auth', false);
    })
    .catch(error => {
      commit('setLoading', false);
      commit('setError', error);
      console.log(error);
    });
};
const signInByTwitter = ({ commit, dispatch }) => {
  commit('setLoading', true);
  commit('clearError');
  const provider = new firebase.auth.TwitterAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const newUser = {
        id: result.user.uid,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      };
      commit('setLoading', false);
      commit('setUser', newUser);
      dispatch('loadProducts');
      bus.$emit('show-auth', false);
    })
    .catch(error => {
      commit('setLoading', false);
      commit('setError', error);
      console.log(error);
    });
};
const logout = ({ commit }) => {
  firebase.auth().signOut();
  commit('setUser', null);
  commit('clearProducts');
};
const clearError = ({ commit }) => {
  commit('clearError');
};

export {
  loadProducts,
  createProduct,
  inMenuToggle,
  signUpUser,
  signInUser,
  autoSignIn,
  signInByGithub,
  signInByTwitter,
  logout,
  clearError,
};
