// mutations_types.js
// export const TC = 'TC';

import * as types from './all_mus_type.js';



export const state = {
  loading: false,
  token: '',
  tc: 0,
  uid: '',
}

// export const getters = {
//   getState (state) {
//     return state;
//   },
//   getAll (state) {
//     return state.todos;
//   },
//   getDone (state) {
//     return state.todos.filter((item) => {
//       return item.done;
//     });
//   },
//   getTodo (state) {
//     return state.todos.filter((item)=>{
//       return !item.done;
//     });
//   }
// }


import firebase from '../../connections/firebase_connect'
const fireAuth = firebase.auth();

export const actions = {
  testchange ({ commit }, num) {
    commit(types.TC, num);
  },
  toggleLoading ({ commit }, isLoading) {
    commit(types.LOADING, isLoading);
  },
  actionLogin ({ commit }, { email, password}) {
    // 目前沒找到比較好的範例 API，因此使用延遲 1.5s 模擬 ajax 以及簡單驗證。
    console.log('1. actionLogin');
    commit(types.LOADING, true); // 打開遮罩
    return new Promise((resolve, reject) => {
      setTimeout(() => {
         fireAuth.signInWithEmailAndPassword(email, password)
        .then(function(user){
          console.log('2. Promise resolve');
          commit(types.TOKEN, '10000'); // success 儲存 token
          commit(types.LOADING, false); // 關閉遮罩
          commit(types.UID, user.uid);
          resolve(); // resolve 結果會在 then 裡面收到
        })
        .catch(function(error){
          commit(types.LOADING, false);
          reject(error); // reject 結果會在 catch 裡面收到
        })
      }, 1500);
    });
    // 使用 Promise 包裝 API
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     if (email === 'aa11@gmail.com' && password === '123123') {
    //       console.log('2. Promise resolve');
    //       commit(types.TOKEN, '3600000'); // success 儲存 token
    //       commit(types.LOADING, false); // 關閉遮罩
    //       resolve(); // resolve 結果會在 then 裡面收到
    //     }
    //     // error
    //     else {
    //       commit(types.LOADING, false); // 關閉遮罩
    //       reject(); // reject 結果會在 catch 裡面收到
    //     }
    //   }, 1500);
    // });
  }
}

export const mutations = {
  [types.TC] (state, changeValue) {
    state.tc = changeValue;
    console.log(state.tc);
  },
  [types.LOADING] (state, isLoading) {
    state.loading = isLoading;
  },
  [types.TOKEN] (state, token) {
    state.token = token;
  },
  [types.UID] (state, uid) {
    state.uid = uid;
  },
}
