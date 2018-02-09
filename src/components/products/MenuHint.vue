<template>
  <div class="menu-hint" v-if="menuCal && BMR">
    <el-alert :title="hint.text" :type="hint.type" :closable="false"></el-alert>
  </div>
</template>

<script>
export default {
  props: {
    menuCal: {
      type: Number,
      default: 0,
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
        text: '',
        type: '',
      };
      if (this.BMR && this.menuCal) {
        hint.type = 'success';
        if (Math.abs(this.BMR - this.menuCal) > 100) {
          hint.type = 'warning';
          if (this.BMR > this.menuCal)
            hint.text = `${this.menuCal} Калорийность меню ниже рекомендуемого уровня`;
          else hint.text = `${this.menuCal} Калорийность меню выше рекомендуемого уровня`;
        } else {
          hint.text = `${this.menuCal} Меню соответствует рекомендуемому уровню`;
        }
      }
      return hint;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
