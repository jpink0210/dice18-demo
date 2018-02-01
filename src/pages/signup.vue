<template>
  <div id="login">
    <div class="container">
      <div class="form-signin">
        <h2 class="form-signin-heading">註冊</h2>
        <br>
        <label for="email" class="sr-only">Email address</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="form-control"
          placeholder="Email address" required autofocus />
        <br><br>
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          v-model="password"
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="password at least 6" required />
        <br><br>
        <label for="inputNick" class="sr-only">Nickname</label>
        <input
          v-model="nickname"
          @keyup.enter="login"
          type="text"
          id="inputNick"
          class="form-control"
          placeholder="Password" required />
        <br><br>
        <p v-text="signUpAlert"></p> 
        <a 
          v-if="showSubmit"
          class="btn btn-lg btn-primary btn-block"
          type="submit"
          @click="submitSignup">
          註冊
        </a>
        <br/>
      </div>
    </div>
  </div>
</template>

<script>
var firebase = require('../../connections/firebase_connect');
var fireAuth = firebase.auth();
export default {
  data () {
    return {
      showSubmit: true,
      email: 'aa11@gmail.com',
      password: '123123',
      nickname: 'Tom',
      signUpAlert: '',
    }   
  },
  mounted () {
  },
  methods: {
    // 因為 action 包裝了 Promise 所以可以使用 then 和 catch 來接收非同步回傳狀態
    submitSignup () {
      this.showSubmit = false;
      this.signUpAlert = '請稍等';
      var that = this;
      fireAuth.createUserWithEmailAndPassword(that.email, that.password)
      .then(function(user){
        var saveUser = {
            'email': that.email,
            'nickname': that.nickname,
            'grade': 1000
        }
        console.log(saveUser);
        firebase.database().ref('/user/'+user.uid).set(saveUser);
        setTimeout( () => {
          window.location.href = './login';
        }, 2000 );
      })
      .catch(function(error){
        that.signUpAlert = error.message ;
      })
    }
  },
  created () {
    // 在 vue 調用 router
    console.log('vue created:', this.$route.matched[0]);
  }
}
</script>

<style>
  .responsive-img {
    width: 100%;
  }

  #login {
    padding-bottom: 40px;
  }
  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
  .form-signin .form-signin-heading,
  .form-signin .checkbox {
    margin-bottom: 10px;
  }
  .form-signin .checkbox {
    font-weight: normal;
  }
  .form-signin .form-control {
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
