import Chart from 'chart.js';

class ChartUtility {
  static showLineFigure(data, labels, cavasId) {
    let ctx = document.getElementById(cavasId).getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'price',
          data: data
        }],
      }
    });
  }
}


export default ChartUtility;

