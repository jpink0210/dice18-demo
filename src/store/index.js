import Vue from 'vue';
import Vuex from 'vuex';
// root
// import {getters, state, actions, mutations} from './root.js';
// root
import * as getters from './getters.js';
import {state, actions, mutations} from './root.js';
// modules
import count from './modules/count';
import todo from './modules/todo';

Vue.use( Vuex );

export default new Vuex.Store({
  // 純 module 的東西
  state,
  actions,
  mutations,
  getters,
  modules: {
    count,
    todo
  },
  // 嚴格模式，禁止直接修改 state
  strict: true
});