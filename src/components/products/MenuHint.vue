<template>
  <div class="menu-hint" v-if="menuCal && BMR">
    <el-alert :title="hint.text" :type="hint.type" :closable="false"></el-alert>
  </div>
</template>

<script>
export default {
  props: ['menuCal', 'BMR'],
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
            hint.text = `${
              this.menuCal
            } (Калорийность меню ниже вашей дневной нормы, следует добавить продукты в рацион)`;
          else
            hint.text = `${
              this.menuCal
            } Калорийность меню выше вашей дневной нормы (следует изъять некоторые продукты)`;
        } else {
          hint.text = `${this.menuCal} Меню соответствует`;
        }
      }
      return hint;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
