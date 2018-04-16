<template>
  <div 
    v-if="menuStats.cal && bmr"
    class="menu-hint" 
  >
    <el-alert 
      :title="hint.cal" 
      :type="hint.type" 
      :closable="false">
      <div class="hint-text">
        {{ hint.text }}
      </div>
      <el-button 
        size="small" 
        type="primary" 
        class="hint-btn"
        plain 
        @click="rememberDailyStats" 
      >Записать</el-button>
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
    bmr: {
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
      if (this.bmr && this.menuStats.cal) {
        hint.cal = `${this.menuStats.cal}`;
        hint.type = 'success';
        if (Math.abs(this.bmr - this.menuStats.cal) > 100) {
          hint.type = 'warning';
          if (this.bmr > this.menuStats.cal) {
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
        bmr: this.bmr,
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
