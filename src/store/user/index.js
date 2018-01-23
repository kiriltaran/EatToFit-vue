import * as firebase from 'firebase';

import bus from '../../main';

/* eslint-disable no-param-reassign */
export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setBMR(state, payload) {
      state.user = {
        ...state.user,
        BMR: payload,
      };
    },
  },
  actions: {
    signupUser({ commit, dispatch }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            displayName: payload.name,
            photoURL: null,
            BMR: null,
          };

          user.updateProfile({
            displayName: payload.name,
          });

          firebase
            .database()
            .ref(`users/${user.uid}`)
            .set({
              displayName: payload.name,
            });

          commit('setUser', newUser);
          dispatch('fetchProducts');
          bus.$emit('show-auth', false);
          commit('setLoading', false);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          window.console.log(error);
        });
    },
    signinUser({ commit, dispatch }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user =>
          firebase
            .database()
            .ref(`/users/${user.uid}`)
            .once('value')
            .then(data => {
              const userStore = data.val();
              commit('setLoading', false);
              commit('setUser', {
                id: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                BMR: userStore.BMR,
              });
              dispatch('fetchProducts');
              bus.$emit('show-auth', false);
            }),
        )
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          window.console.log(error);
        });
    },
    // autoSignIn({ commit, dispatch }, payload) {},
    signInBySocials({ commit, dispatch }, payload) {
      commit('setLoading', true);
      commit('clearError');
      let provider;
      switch (payload) {
        case 'github':
          provider = new firebase.auth.GithubAuthProvider();
          break;
        case 'twitter':
          provider = new firebase.auth.TwitterAuthProvider();
          break;
        default:
      }
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(({ user }) => {
          firebase
            .database()
            .ref(`/users/${user.uid}`)
            .once('value')
            .then(data => {
              const userStore = data.val();

              const newUser = {
                id: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                BMR: userStore.BMR,
              };
              commit('setLoading', false);
              commit('setUser', newUser);
              dispatch('fetchProducts');
              bus.$emit('show-auth', false);
            });
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          window.console.log(error);
        });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
      commit('clearProducts');
    },
    setBMR({ commit, state }, payload) {
      firebase
        .database()
        .ref()
        .update({
          [`/users/${state.user.id}/BMR`]: payload,
        });
      commit('setBMR', payload);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    BMR(state) {
      return state.user.BMR;
    },
  },
};
