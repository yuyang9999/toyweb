<template lang="pug">
  section
    el-button(@click="test") 测试
    el-button(@click="showChart") 显示图表
    el-autocomplete(v-model="state4" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect")
    canvas(id="myChart" width="400" height="400")
</template>

<script>
  import axios from 'axios'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
  import Chart from 'chart.js'
  import ChartUtility from '../utils/ChartUtility'
  //  import ElAutocomplete from "../../node_modules/element-ui/packages/autocomplete/src/autocomplete.vue";

  export default {
    components: {
//      ElAutocomplete,
      ElButton
    },
    name: 'HelloWorld',
    data() {
      return {
        state4: '',
        timeout: null
      }
    },
    methods: {
      test() {
        axios.get('/test').then(function (resp) {
          console.log(resp);
        }).catch(function (error) {
          console.log(error);
        })
      },
      querySearchAsync(queryString, cb) {
        axios.get('/query?symbol=' + queryString).then((resp) => {
          let ret = [];
          const symbols = resp.data;
          for (let i = 0; i < symbols.length; i++) {
            ret.push({value: symbols[i]});
          }
          cb(ret);
        });
      },

      handleSelect(item) {
        console.log('select item' + item);
      },

      showChart() {
        let labels = ['1', '2', '3', '4', '5', '6'];
        let values = [55, 67, 34, 67, 68, 34];

        ChartUtility.showLineFigure(values, labels, 'myChart');
      }
    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
