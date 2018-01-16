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
    setBMR(state, payload) {
      state.user = {
        ...state.user,
        BMR: payload,
      };
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
          bus.$emit('show-auth', false);
          commit('setLoading', false);
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
        .then(user =>
          firebase
            .database()
            .ref(`/users/${user.uid}`)
            .once('value')
            .then(data => {
              const userObj = data.val();
              commit('setLoading', false);
              commit('setUser', {
                id: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                BMR: userObj.BMR,
              });
              dispatch('fetchProducts');
              bus.$emit('show-auth', false);
            }),
        )
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
        BMR: payload.BMR,
      };
      commit('setUser', user);
      dispatch('fetchProducts');
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
            BMR: result.user.BMR,
          };
          commit('setLoading', false);
          commit('setUser', newUser);
          dispatch('fetchProducts');
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
            BMR: result.user.BMR,
          };
          commit('setLoading', false);
          commit('setUser', newUser);
          dispatch('fetchProducts');
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
    setBMR({ commit }, payload) {
      firebase
        .database()
        .ref()
        .update({
          [`/users/${payload.userId}/BMR`]: payload.BMR,
        });
      commit('setBMR', payload.BMR);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
