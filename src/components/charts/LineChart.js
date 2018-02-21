import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    labels: {
      type: Array,
      default() {
        return [];
      },
    },
    goal: {
      type: Array,
      default() {
        return [];
      },
    },
    cal: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: 'Цель',
            data: this.goal,
          },
          {
            label: 'Калорийность вашего рациона',
            backgroundColor: '#f7931e',
            data: this.cal,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false },
    );
  },
};
