import Vue from 'vue';
import Vuex from 'vuex';
import Services from '@/services';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errorToast: {
      show: false,
      text: '',
    },
    infoToast: {
      show: false,
      text: '',
    },
    successToast: {
      show: false,
      text: '',
    },
    empresas: [],
    diagnosticos: [],
    user: null,
  },
  mutations: {
    showToast(store, payload) {
      switch (payload.type) {
        case 'error':
          store.errorToast.show = true;
          store.errorToast.text = payload.text;
          break;
        case 'info':
          store.infoToast.show = true;
          store.infoToast.text = payload.text;
          break;
        case 'success':
          store.successToast.show = true;
          store.successToast.text = payload.text;
          break;
      }
    },
    setEmpresas(state, payload) {
      state.empresas = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setDiagnosticos(state, payload) {
      state.diagnosticos = payload;
    }
  },
  actions: {
    async getUser({commit}) {
      const {data} = await Services.getUser();
      commit('setUser', data);
    },
  },
  modules: {}
});
