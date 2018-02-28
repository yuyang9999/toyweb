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
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      }
    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
