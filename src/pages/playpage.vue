<template>
  <div>
    <div style="text-align: center">
        <h1 v-text="player.nickname+',你好'"></h1>
        <h2 v-text="'你目前的積分為'+player.grade+'分'"></h2>
        <h2 v-text="'魔王目前的積分為'+kingblood+'分'"></h2>
    </div>
    <div>
      <h1>開始遊戲</h1>
      <div v-if="gaming">
        <button class="gameBtn" @click="playSon18(10)">押 10 擲骰</button>
        <button class="gameBtn" @click="playSon18(100)">押 100 擲骰</button>
        <button class="gameBtn" @click="playSon18(1000)">押 1000 擲骰</button>
        <br>
        <p v-text="gameAlert"></p>
      </div>
      <div class="showResult">
        <p>您擲的點數為</p>
        <p v-text="manpoints"></p>
        <p>魔王的點數為</p>
        <p v-text="kingpoints"></p>
        <br>
        <p v-text="alert2"></p>
      </div>
    </div>
    
  </div> 
</template>
<script> 

var firebase = require('../../connections/firebase_connect');
var fireAuth = firebase.auth();
var user;

import {mapGetters} from 'vuex'

export default {
  name: 'play',
  data () {
    return {
      player: {},
      kingblood: 0,
      gameAlert: '',
      gaming: true,
      manpoints: [],
      kingpoints: [],
      alert2: '',
    }
  },
  computed: mapGetters({
    allstate: 'getAllstate'
  }),
  mounted (){
    var that = this;
    user = firebase.database().ref('user/'+this.allstate.uid);
    user.on('value',function(snapshot){
      that.player = snapshot.val() ;
    });
    firebase.database().ref('KingBlood').on('value',function(snapshot){
      that.kingblood = snapshot.val() ;
    });
  },
  methods: {
    playSon18 (coin) {
      this.gameAlert = '';
      var oirBlood = this.player.grade;
      if(coin > oirBlood){
        this.gameAlert = '錢不夠，請改押小注';
        return;
      }
      var king = this.getResult();
      var man =  this.getResult();
      this.kingpoints = this.getOriginal(king);
      this.manpoints = this.getOriginal(man);
      if(king.indexOf(3) != -1 ){
        this.alert2 = '魔王豹子，通殺';
        var kkkk = ( this.kingblood+coin > 100000 ) ? 100000 : (this.kingblood + coin);
        firebase.database().ref('KingBlood').set(kkkk);
        firebase.database().ref('user/'+this.allstate.uid+'/grade').set(oirBlood-coin);
        return;
      }
      if(man.indexOf(3) != -1 ){
        this.alert2 = '恭喜你，豹子，賠雙倍';
        firebase.database().ref('user/'+this.allstate.uid+'/grade').set(oirBlood+2*coin);
        firebase.database().ref('KingBlood').set(this.kingblood-2*coin);
        return;
      }
      if (this.kingpoints[0] > this.manpoints[0] ) {
        this.alert2 = '魔王勝';
        var kkkk = ( this.kingblood+coin > 100000 ) ? 100000 : this.kingblood +coin;
        firebase.database().ref('KingBlood').set(kkkk);
        firebase.database().ref('user/'+this.allstate.uid+'/grade').set(oirBlood-coin);
        return;
      }else if (this.kingpoints[0] == this.manpoints[0] ) {
        this.alert2 = '平手';
        return;
      }else{
        this.alert2 = '你贏了';
        firebase.database().ref('user/'+this.allstate.uid+'/grade').set(oirBlood+coin);
        firebase.database().ref('KingBlood').set(this.kingblood-coin);
      }
    },
    getOriginal (ans6) {
      if(ans6.indexOf(3) != -1){
        var theTriple = ans6.indexOf(3)+1;
        return [theTriple, theTriple, theTriple];
      }else{
        var the2 = ans6.indexOf(2)+1;
        var the1 = ans6.indexOf(1)+1;
        return [the1, the2, the2];
      }
    },
    getResult () {
      var staticResult = [1,1,1,0,0,0];
      var count = 0;
      while( (staticResult.indexOf(3)==-1 && staticResult.indexOf(2) == -1)){
        staticResult = this.getPoints();
      }
      return staticResult;
    },
    getPoints () {
      var oneTime = this.throwing();
      var statics = [0,0,0,0,0,0];
      oneTime.forEach(function(item){
        statics[item-1]++;
      });
      return statics;
    },
    throwing () {
      var t1 = Math.floor( Math.random()*6 )+1;
      var t2 = Math.floor( Math.random()*6 )+1;
      var t3 = Math.floor( Math.random()*6 )+1;
      return [t1, t2, t3];
    }
  }
}
</script>
<style>
.gameBtn{
  border: 2px solid #000;
  border-radius: 10px;
  height: 100px;
  width: 200px;
  background-color: #fff;
  line-height: 50px;
  text-align: center;
  float: left;
  margin: 10px 20px;
}
.showResult{
  clear:both;text-align:left;
  padding-left: 200px;
}
</style>
