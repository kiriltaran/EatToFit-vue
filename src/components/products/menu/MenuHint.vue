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
};
</script>

<style lang="scss" scoped>
.hint-text {
  font-size: 13px;
}
</style>
