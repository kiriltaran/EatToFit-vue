import api from '../../api';

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
    async signupUser({ commit, dispatch }, payload) {
      commit('setLoading', true);
      commit('clearError');

      try {
        const newUser = await api.signupUser(payload.name, payload.email, payload.password);

        commit('setUser', newUser);
        dispatch('fetchProducts');
        bus.$emit('show-auth', false);
        commit('setLoading', false);
      } catch (e) {
        commit('setLoading', false);
        commit('setError', e);
        window.console.log(e);
      }
    },
    async signinUser({ commit, dispatch }, payload) {
      commit('setLoading', true);
      commit('clearError');
      try {
        const user = await api.signinUser(payload.email, payload.password);

        commit('setUser', user);
        dispatch('fetchProducts');
        bus.$emit('show-auth', false);
        commit('setLoading', false);
      } catch (e) {
        commit('setLoading', false);
        commit('setError', e);
        window.console.log(e);
      }
    },
    async autoSignIn({ commit, dispatch }, payload) {
      const userStore = await api.getUserFromDB(payload.uid);

      commit('setUser', {
        id: payload.uid,
        displayName: payload.displayName,
        photoURL: payload.photoURL,
        BMR: userStore.BMR,
      });
      dispatch('fetchProducts');
    },
    async signInBySocials({ commit, dispatch }, payload) {
      commit('setLoading', true);
      commit('clearError');
      try {
        const newUser = await api.signInBySocials(payload);

        commit('setLoading', false);
        commit('setUser', newUser);
        dispatch('fetchProducts');
        bus.$emit('show-auth', false);
      } catch (e) {
        commit('setLoading', false);
        commit('setError', e);
        window.console.log(e);
      }
    },
    logout({ commit }) {
      api.logout();

      commit('setUser', null);
      commit('clearProducts');
    },
    setBMR({ commit, state }, payload) {
      api.setBMR(state.user.id, payload);

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
