<template>
  <el-row type="flex" justify="space-around" class="stats-container">
    <el-col :span="6">
      <el-card class="chart">
        <pie-chart :prot="prot" :fat="fat" :carbo="carbo" class="chart"></pie-chart>
      </el-card>
    </el-col>
    <el-col :span="17">
      <el-card class="chart">
        <line-chart class="chart"></line-chart>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import LineChart from './charts/LineChart';
import PieChart from './charts/PieChart';

export default {
  components: {
    LineChart,
    PieChart,
  },
  data() {
    return {
      prot: 400,
      fat: 200,
      carbo: 1200,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
