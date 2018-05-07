<template>
  <div class="stats-container">
    <!-- <el-row type="flex" justify="space-around">
      <el-button-group>
        <el-button size="small" type="primary">Неделя</el-button>
        <el-button size="small" plain type="primary">Месяц</el-button>
        <el-button size="small" plain type="primary">Год</el-button>
        <el-button size="small" plain type="primary">Все время</el-button>
      </el-button-group>
    </el-row> -->
    <el-row 
      type="flex" 
      justify="space-around">
      <el-col :span="6">
        <el-card class="chart">
          <pie-chart 
            :prot="prot" 
            :fat="fat" 
            :carbo="carbo" 
            class="chart"/>
        </el-card>
      </el-col>
      <el-col :span="17">
        <el-card class="chart">
          <line-chart 
            :labels="labels" 
            :goal="goal" 
            :cal="cal" 
            class="chart"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {
    LineChart: () => import('./charts/LineChart'),
    PieChart: () => import('./charts/PieChart'),
  },
  data() {
    return {};
  },
  computed: {
    prot() {
      let result = 0;
      if (this.userStats) {
        Object.keys(this.userStats).forEach(key => {
          result += this.userStats[key].prot;
        });
      }

      return result;
    },
    fat() {
      let result = 0;
      if (this.userStats) {
        Object.keys(this.userStats).forEach(key => {
          result += this.userStats[key].fat;
        });
      }

      return result;
    },
    carbo() {
      let result = 0;
      if (this.userStats) {
        Object.keys(this.userStats).forEach(key => {
          result += this.userStats[key].carbo;
        });
      }

      return result;
    },
    labels() {
      const result = [];
      if (this.userStats) {
        Object.keys(this.userStats).forEach(key => {
          const date = new Date(+key);
          result.push(`${date.getUTCDate() + 1}/${date.getUTCMonth() + 1}`);
        });
      }

      return result;
    },
    goal() {
      const result = [];
      if (this.userStats) {
        Object.keys(this.userStats).forEach(key => {
          result.push(this.userStats[key].bmr);
        });
      }

      return result;
    },
    cal() {
      const result = [];
      if (this.userStats) {
        Object.keys(this.userStats).forEach(key => {
          result.push(this.userStats[key].cal);
        });
      }

      return result;
    },
    userStats() {
      return this.$store.getters.userStats;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>