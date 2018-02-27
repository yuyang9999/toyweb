<template lang="pug">
  section
    el-button(@click="test") 测试
</template>

<script>
  import axios from 'axios'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    components: {ElButton},
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      test() {
        axios.get('/api/one_day?symbol=aapl').then(function (resp) {
          console.log(resp);
        }).catch(function (error) {
          console.log(error);
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
