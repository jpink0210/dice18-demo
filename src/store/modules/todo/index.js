import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations } from './mutations.js'
import * as getters from './getters.js'
import * as actions from './actions.js'

Vue.use( Vuex );

export default{
  state,
  mutations,
  getters,
  actions,
  // 嚴格模式，禁止直接修改 state
  strict: true
};