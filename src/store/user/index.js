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
    setUserData(state, payload) {
      state.user = {
        ...state.user,
        gender: payload.gender,
        height: payload.height,
        weight: payload.weight,
        age: payload.age,
        activity: payload.activity,
        goal: payload.goal,
        BMR: payload.BMR,
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
        gender: userStore.gender,
        height: userStore.height,
        weight: userStore.weight,
        age: userStore.age,
        activity: userStore.activity,
        goal: userStore.goal,
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
    rememberUserData({ commit, state }, payload) {
      api.setUserData(state.user.id, payload);

      commit('setUserData', payload);
    },
    setDailyStats({ state }, payload) {
      api.setDailyStats(state.user.id, payload);

      // commit('setDailyStats', payload);
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
