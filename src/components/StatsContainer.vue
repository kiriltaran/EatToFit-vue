<template>
  <div class="stats-container">
    <div class="stats">
      <el-row 
        type="flex" 
        justify="space-around">
        <el-col :span="17">
          <div class="stats-info">
            <div class="user"><div class="name">{{ user.displayName }}</div><div class="data">{{ user.age }} года {{ user.weight }} кг {{ user.height }} см</div></div>
            <div class="prot">Белки: {{ prot }}</div>
            <div class="fat">Жиры: {{ fat }}</div>
            <div class="carbo">Углеводы: {{ carbo }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stats-ranges">
            <el-button-group>
              <el-button 
                :plain="range === 7 ? false: true"
                type="primary"
                @click="setRange(7)">
                Неделя
              </el-button>
              <el-button 
                :plain="range === 30 ? false: true"
                type="primary"
                @click="setRange(30)">
                Месяц
              </el-button>
              <el-button
                :plain="range === 999 ? false: true"
                type="primary"
                @click="setRange(999)">
                Все время
              </el-button>
            </el-button-group>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row 
      type="flex" 
      justify="space-around">
      <el-col :span="6">
        <el-card class="chart">
          <pie-chart 
            :chart-data="pieChartData"
            :options="{ responsive: true, maintainAspectRatio: false }"
            class="chart"/>
        </el-card>
      </el-col>
      <el-col :span="17">
        <el-card class="chart">
          <line-chart
            :chart-data="lineChartData"
            :options="{ responsive: true, maintainAspectRatio: false }"
            class="chart"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import LineChart from './charts/LineChart';
import PieChart from './charts/PieChart';

export default {
  components: {
    LineChart,
    PieChart,
  },
  data() {
    return {
      range: 7,
    };
  },
  computed: {
    prot() {
      let result = 0;
      if (this.userStats) {
        Object.keys(this.userStats).forEach(key => {
          if (differenceInCalendarDays(new Date(), new Date(+key)) < this.range) {
            result += this.userStats[key].prot;
          }
        });
      }

      return result;
    },
    fat() {
      let result = 0;
      if (this.userStats) {
        Object.keys(this.userStats).forEach(key => {
          if (differenceInCalendarDays(new Date(), new Date(+key)) < this.range) {
            result += this.userStats[key].fat;
          }
        });
      }

      return result;
    },
    carbo() {
      let result = 0;
      if (this.userStats) {
        Object.keys(this.userStats).forEach(key => {
          if (differenceInCalendarDays(new Date(), new Date(+key)) < this.range) {
            result += this.userStats[key].carbo;
          }
        });
      }

      return result;
    },
    labels() {
      const result = [];
      if (this.userStats) {
        Object.keys(this.userStats).forEach(key => {
          if (differenceInCalendarDays(new Date(), new Date(+key)) < this.range) {
            const date = new Date(+key);
            result.push(`${date.getDate()}/${date.getMonth()}`);
          }
        });
      }

      return result;
    },
    goal() {
      const result = [];
      if (this.userStats) {
        Object.keys(this.userStats).forEach(key => {
          if (differenceInCalendarDays(new Date(), new Date(+key)) < this.range) {
            result.push(this.userStats[key].bmr);
          }
        });
      }

      return result;
    },
    cal() {
      const result = [];
      if (this.userStats) {
        Object.keys(this.userStats).forEach(key => {
          if (differenceInCalendarDays(new Date(), new Date(+key)) < this.range) {
            result.push(this.userStats[key].cal);
          }
        });
      }

      return result;
    },
    lineChartData() {
      return {
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
      };
    },
    pieChartData() {
      return {
        labels: ['Белки', 'Жиры', 'Углеводы'],
        datasets: [
          {
            backgroundColor: ['#26ade1', '#f7931e', '#8bc53d'],
            data: [this.prot, this.fat, this.carbo],
          },
        ],
      };
    },
    userStats() {
      return this.$store.getters.userStats;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    setRange(range) {
      this.range = range;
    },
  },
};
</script>

<style lang="scss" scoped>
.stats {
  margin-bottom: 50px;
  &-info {
    height: 300px;
    .user {
    }
    .name {
      display: inline-block;
      font-size: 36px;
    }
    .data {
      margin-left: 20px;
      display: inline-block;
    }
  }
  &-ranges {
    float: right;
  }
}
</style>