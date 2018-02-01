<template>
  <div class="hello">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>遊戲規則</h2>
    <ol>
      <li>魔王有 100000 分的血量，玩家初始值有 1000 分</li><br>
      <li>遊戲方式為 台灣民俗遊戲 『洗芭辣』『十八仔』<a href="https://zh.wikipedia.org/wiki/%E5%8D%81%E5%85%AB%E4%BB%94">規則連結</a></li><br>
      <li>每次玩樂可以依照 10, 100 ,1000 押注</li><br>
      <li>會紀錄戰鬥的經典過程，歡迎各位一起把魔王擊倒</li><br>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '歡迎光臨搖骰小遊戲'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ol {
  padding: 10px;
}
li {
  display: inline-block;
  margin: 10 10px;
}
a {
  color: #42b983;
}
</style>
