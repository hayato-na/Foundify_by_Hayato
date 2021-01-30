import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import router from '../router';
import axiosRefresh from '../axios-refresh';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    displayName: null,
    email: null,
  },
  getters: {
    idToken: (state) => state.idToken,
    displayName: (state) => state.displayName,
    email: (state) => state.email,
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    },
    updateDisplayName(state, displayName) {
      state.displayName = displayName;
    },
    updateEmail(state, email) {
      state.email = email;
    },
  },
  actions: {
    async autoLogin({ commit, dispatch }) {
      const idTokenAutoLogin = localStorage.getItem('idToken');
      if (!idTokenAutoLogin) return;
      const now = new Date();
      const expiryTimeMs = localStorage.getItem('expiryTimeMs');
      const isExpired = now.getTime() >= expiryTimeMs;
      const refreshToken = localStorage.getItem('refreshToken');
      if (isExpired) {
        await dispatch('refreshToken', refreshToken);
        dispatch('getMyAccountData', {
          idToken: idTokenAutoLogin,
        });
      } else {
        const expiresInMs = expiryTimeMs - now.getTime();
        setTimeout(() => {
          dispatch('refreshIdToken', refreshToken);
        }, expiresInMs);
        commit('updateIdToken', idTokenAutoLogin);
        dispatch('getMyAccountData', {
          idToken: idTokenAutoLogin,
        });
      }
    },
    login({ dispatch }, authData) {
      console.log('start login');
      console.log(authData);
      axios.post(
        '/accounts:signInWithPassword?key=AIzaSyAG3S1n4DmmZicc4vle--d_6EeKaGTThoc', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        },
      ).then((response) => {
        dispatch('setAuthData', {
          idToken: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshToken: response.data.refreshToken,
        });
        dispatch('getMyAccountData', {
          idToken: response.data.idToken,
        });
        router.push('/');
      });
    },
    async refreshIdToken({ dispatch }, refreshToken) {
      await axiosRefresh.post('token?key=AIzaSyAG3S1n4DmmZicc4vle--d_6EeKaGTThoc', {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }).then((response) => {
        dispatch('setAuthData', {
          idToken: response.data.id_token,
          expiresIn: response.data.expires_in,
          refreshToken: response.data.refresh_token,
        });
      });
    },
    register({ commit, dispatch }, authData) {
      console.log('dispatch registe authData');
      console.log(authData);
      const authDisplayName = authData.displayName;
      console.log('authDisplayName is');
      console.log(authDisplayName);
      commit('updateDisplayName', authData.displayName);
      axios.post(
        '/accounts:signUp?key=AIzaSyAG3S1n4DmmZicc4vle--d_6EeKaGTThoc', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        },
      ).then((response) => {
        console.log('this is response in register');
        console.log(response);
        dispatch('setAuthData', {
          idToken: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshToken: response.data.refreshToken,
        });
        // dispatch('postDisplayName', {
        //   idToken: response.data.idToken,
        //   displayName: authDisplayName,
        // });
        axios.post(
          '/accounts:update?key=AIzaSyAG3S1n4DmmZicc4vle--d_6EeKaGTThoc', {
            idToken: response.data.idToken,
            displayName: authData.displayName,
          },
        ).then((response02) => {
          console.log('This is response02 from postDisplayName');
          console.log(response02);
          router.push('/');
        }).catch((error) => {
          console.log('--------エラー内容--------');
          console.log(error);
          alert('エラーです。');
        });
      });
    },
    // postDisplayName(authData) {
    //   console.log('authData.displayName is ');
    //   console.log(authData);
    // },
    getMyAccountData({ commit }, authData) {
      axios.post(
        '/accounts:lookup?key=AIzaSyAG3S1n4DmmZicc4vle--d_6EeKaGTThoc', {
          idToken: authData.idToken,
        },
      ).then((response) => {
        console.log('response.data.users[0]');
        console.log(response.data.users[0]);
        console.log(response.data.users[0].email);
        commit('updateDisplayName', response.data.users[0].displayName);
        commit('updateEmail', response.data.users[0].email);
      }).catch((error) => {
        console.log('エラーです');
        console.log(error);
      });
    },
    setAuthData({ commit, dispatch }, authData) {
      const now = new Date();
      const expiryTimeMs = now.getTime() + authData.expiresIn * 1000;
      commit('updateIdToken', authData.idToken);
      localStorage.setItem('idToken', authData.idToken);
      localStorage.setItem('expiryTimeMs', expiryTimeMs);
      localStorage.setItem('refreshToken', authData.refreshToken);
      setTimeout(() => {
        dispatch('refreshIdToken', authData.refreshToken);
      }, authData.expiresIn * 1000);
    },
    logout({ commit }) {
      commit('updateIdToken', null);
      localStorage.removeItem('idToken');
      localStorage.removeItem('expiryTimeMs');
      localStorage.removeItem('refreshToken');
      router.push('/login');
    },
  },
  modules: {
  },
});
