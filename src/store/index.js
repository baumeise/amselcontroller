import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ip: undefined,
    connectionStatus: undefined,
    speed: 0,
    direction: 0
  },
  mutations: {
    changeIP(state, payload) {
      state.ip = payload
    },
    changeSpeed (state, payload) {
      state.speed = payload;
    },
    changeDirection (state, payload) {
      state.direction = payload;
    },
    changeConnectionStatus (state, payload) {
      state.connectionStatus = payload;
    }
  },
  getters: {
    getIP(state) {
      return state.ip;
    },
    getSpeed (state) {
      return state.speed;
    },
    getDirection (state) {
      return state.direction;
    },
    getConnectionStatus (state) {
      return state.connectionStatus;
    }
  }
});
