import api from '../../api';

/* eslint-disable no-param-reassign */
export default {
  state: {
    user: null,
    userStats: null,
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
        bmr: payload.bmr,
      };
    },
    setUserStats(state, payload) {
      state.userStats = payload;
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
        dispatch('fetchUserStats');
        commit('setLoading', false);
      } catch (e) {
        commit('setLoading', false);
        commit('setError', e);
        throw e;
      }
    },
    async signinUser({ commit, dispatch }, payload) {
      commit('setLoading', true);
      commit('clearError');
      try {
        const user = await api.signinUser(payload.email, payload.password);

        commit('setUser', user);
        dispatch('fetchProducts');
        dispatch('fetchUserStats');
        commit('setLoading', false);
      } catch (e) {
        commit('setLoading', false);
        commit('setError', e);
        throw e;
      }
    },
    async autoSignIn({ commit, dispatch }, payload) {
      let userStore = await api.getUserData(payload.uid);

      if (!userStore) {
        userStore = {
          gender: '',
          height: 1,
          weight: 1,
          age: 1,
          activity: '',
          goal: '',
          bmr: null,
        };
      }

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
        bmr: userStore.bmr,
      });
      dispatch('fetchProducts');
      dispatch('fetchUserStats');
    },
    async signInBySocials({ commit, dispatch }, payload) {
      commit('setLoading', true);
      commit('clearError');
      try {
        const newUser = await api.signInBySocials(payload);

        commit('setLoading', false);
        commit('setUser', newUser);
        dispatch('fetchProducts');
      } catch (e) {
        commit('setLoading', false);
        commit('setError', e);
        throw e;
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
    async setDailyStats({ state, dispatch }, payload) {
      await api.setDailyStats(state.user.id, payload);
      dispatch('fetchUserStats');
    },
    async fetchUserStats({ state, commit }) {
      const userStats = await api.fetchUserStats(state.user.id);

      commit('setUserStats', userStats);
    },
  },
  getters: {
    user: state => state.user,
    userStats: state => state.userStats,
  },
};
