import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
        datasets: [
          {
            label: 'Цель',
            data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
          },
          {
            label: 'Калорийность вашего рациона',
            backgroundColor: '#f7931e',
            data: [6, 4, 3, 5, 6, 6, 7, 5, 4, 5],
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false },
    );
  },
};
