import * as firebase from 'firebase';

import bus from '../../main';

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    signupUser({ commit }, payload) {
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
    },
    signinUser({ commit, dispatch }, payload) {
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
          dispatch('setProducts');
          bus.$emit('show-auth', false);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },
    autoSignIn({ commit, dispatch }, payload) {
      const user = {
        id: payload.uid,
        displayName: payload.displayName,
        photoURL: payload.photoURL,
      };
      commit('setUser', user);
      dispatch('setProducts');
    },
    signInByGithub({ commit, dispatch }) {
      commit('setLoading', true);
      commit('clearError');
      const provider = new firebase.auth.GithubAuthProvider();
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
          dispatch('setProducts');
          bus.$emit('show-auth', false);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },
    signInByTwitter({ commit, dispatch }) {
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
          dispatch('setProducts');
          bus.$emit('show-auth', false);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
      commit('clearProducts');
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
