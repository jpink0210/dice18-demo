//. 不只有放入 mutations 還有 state 剛好放在這裡。
// 因為都算是『核心』『不可比擬』之 store 獨特元件

import * as types from './mutations_type.js'
import Vue from 'vue'
import * as allmustype from '../../all_mus_type.js'


// state
export const state = {
  count: 0,
  todos: [
    { key: 0, content: 'vue.js 2.0', done: true },
  { key: 1, content: 'vuex 2.0', done: false },
  { key: 2, content: 'vue-router 2.0', done: false },
  { key: 3, content: 'vue-resource 2.0', done: true },
  { key: 4, content: 'webpack', done: false }
  ]
};

// mutations

// 這邊簡單做一個 todo 的流水 key
// 預設值是 todos 的長度
let todoKey = state.todos.length;
export const mutations = {
  [types.ADD_TODO] (state, newTodo) {

    // todos 是一個 Array 所以 push 一個同結構的 Object
    state.todos.push({
      key: todoKey, // 流水 key
      content: newTodo, // 新 todo 的內容
      done: false // 預設當然是未做完
    });
  
  // 流水 key +1
    todoKey++;
  },
  // 改變狀態
  [types.TOGGLE_TODO] (state, key) {
    for(var i in state.todos){
      var item = state.todos[i];
      if ( item.key === key){
        item.done = !item.done;
        console.log('TOGGLE_TODO:', item.content, 'done?', item.done);
        break;
      }
    }
  },
  // 刪除
  [types.DELETE_TODO] (state, key) {
    for(var i in state.todos){
      var item = state.todos[i];
      if ( item.key === key){
        console.log('DELETE_TODO:', item.content, ', index?', i);
        state.todos.splice(i, 1);
        break
      }
    }
  },
  [types.UPDATE_TODO] (state, obj) {
    for(var i in state.todos){
      var item = state.todos[i];
      if ( item.key === obj.key){
        console.log('UPDATE_TODO:', item.content, ' to →', obj.change);
      // 找到 todo 更新 content
        state.todos[ i ].content = obj.change;
        break;
      }
    }
  },
  // tc
  [allmustype.TC] (state, num) {
    state.tc = num;
  },
}
