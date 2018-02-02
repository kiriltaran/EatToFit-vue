import { Pie } from 'vue-chartjs';

export default {
  extends: Pie,
  props: {
    prot: {
      type: Number,
      default: 0,
    },
    fat: {
      type: Number,
      default: 0,
    },
    carbo: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.renderChart(
      {
        labels: ['Белки', 'Жиры', 'Углеводы'],
        datasets: [
          {
            backgroundColor: ['#26ade1', '#f7931e', '#8bc53d'],
            data: [this.prot, this.fat, this.carbo],
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false },
    );
  },
};
