<template>
  <div class="menu-hint" v-if="menuStats.cal && BMR">
    <el-alert :title="hint.cal" :type="hint.type" :closable="false">
      <div class="hint-text">
        {{hint.text}}
      </div>
      <el-button size="small" type="primary" plain @click="rememberDailyStats" class="hint-btn">Записать</el-button>
    </el-alert>
  </div>
</template>

<script>
export default {
  props: {
    menuStats: {
      type: Object,
      default() {
        return {
          cal: 0,
          prot: 0,
          fat: 0,
          carbo: 0,
        };
      },
    },
    BMR: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  computed: {
    hint() {
      const hint = {
        cal: '',
        text: '',
        type: '',
      };
      if (this.BMR && this.menuStats.cal) {
        hint.cal = `${this.menuStats.cal}`;
        hint.type = 'success';
        if (Math.abs(this.BMR - this.menuStats.cal) > 100) {
          hint.type = 'warning';
          if (this.BMR > this.menuStats.cal) {
            hint.text = 'Калорийность меню ниже рекомендуемого уровня';
          } else {
            hint.text = 'Калорийность меню выше рекомендуемого уровня';
          }
        } else {
          hint.text = 'Меню соответствует рекомендуемому уровню';
        }
      }
      return hint;
    },
  },
  methods: {
    rememberDailyStats() {
      this.$store.dispatch('setDailyStats', {
        BMR: this.BMR,
        cal: this.menuStats.cal,
        prot: this.menuStats.prot,
        fat: this.menuStats.fat,
        carbo: this.menuStats.carbo,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.hint-text {
  font-size: 13px;
}
.hint-btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
