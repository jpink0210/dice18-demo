<template>
  <div id="app">
    <!-- loading -->
    <div v-if="loading" class="loader loader-curtain is-active"></div>
    <!-- header -->
    <header>
      <router-link :to="{name: 'home'}">
        <div class="logo"></div>
      </router-link>
      <router-link :to="{name: 'play'}">
        <div class="com-link">遊戲頁面</div>
      </router-link>
      <router-link :to="{name: 'count'}">
        <div class="com-link">count</div>
      </router-link>
      <router-link :to="{name: 'todo'}">
        <div class="com-link">todo</div>
      </router-link>
    </header>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: mapGetters({
    loading: 'getLoading'
  }),
  mounted () {
    // setTimeout( () => {
    //   this.$store.dispatch('toggleLoading', false);
    // }, 1500)
  },
}
</script>

<style>
body{
  margin:  0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  border: 0;
  /* margin-top: 60px; */
}
header{
  position: relative;
  width: 100%;
  height: 70px;
  background-color: #fff;
  border-bottom: 1px solid grey;
  box-shadow: 0px 5px grey;
  padding: 5px 30px;

}
.logo{
  float: left;
  width: 70px;
  height: 70px;
  background-image: url(assets/logo.png);
  background-size: contain;
  margin-right: 100px;
}
.com-link{
  float: left;
  line-height: 70px;
  font-size: 30px;
  color: lightgray;
  margin-left: 20px;
}
.loader{
  color:#fff;
  position:fixed;
  box-sizing:border-box;
  width:100%;height:0;overflow:hidden;z-index:999999}
  
  .loader:after,.loader:before{
    box-sizing:border-box;
    margin-left: -50%;
  }
  .loader.is-active{background-color:rgba(0,0,0,0.85);width:100%;height:100%;left:0;top:0}
  .loader-curtain:before,.loader-curtain:after{position:fixed;width:100%;top:50%;margin-top:-35px;font-size:70px;text-align:center;font-family:Helvetica,Arial,sans-serif;overflow:hidden;line-height:1.2;content:'loading, wait plz~'}
  .loader-curtain:before{color:#666}
  .loader-curtain:after{color:#fff;height:0;animation:curtain .5s linear infinite alternate both}
  .loader-curtain[data-curtain-text]:not([data-curtain-text='']):before,
  .loader-curtain[data-curtain-text]:not([data-curtain-text='']):after{content:attr(data-curtain-text)}
  .loader-curtain[data-brazilian]:before{color:#f1c40f}
  .loader-curtain[data-brazilian]:after{color:#2ecc71}
  .loader-curtain[data-colorful]:before{animation:maskColorful 2s linear infinite alternate both}
  .loader-curtain[data-colorful]:after{animation:curtain 1s linear infinite alternate both, maskColorful-front 2s 1s linear infinite alternate both;color:#000}
  @keyframes maskColorful{0%{color:#3498db}49.5%{color:#3498db}50.5%{color:#e74c3c}100%{color:#e74c3c}}
  @keyframes maskColorful-front{0%{color:#2ecc71}49.5%{color:#2ecc71}50.5%{color:#f1c40f}100%{color:#f1c40f}}
  @keyframes curtain{
    0%{height:0} 
    100%{height:84px}
  }

</style>
