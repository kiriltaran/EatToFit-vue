<template>
  <div>
    {{getHint}}
  </div>
</template>

<script>
import { bus } from '../main'

export default {
  data() {
    return {
      menuKcal: null,
      BMR: null
    }
  },
  created: function () {
    bus.$on('bmr-getted', (data) => {
      this.BMR = data;
    });
    bus.$on('menuKcal-getted', (data) => {
      this.menuKcal = data;
    });
  },
  computed: {
    getHint: function () {
      let hint = null;
      if (this.BMR && this.menuKcal) {
        if (Math.abs(this.BMR - this.menuKcal) > 100) {
          if (this.BMR > this.menuKcal) hint = 'Калорийность меню ниже вашей дневной нормы (следует добавить продукты в рацион)';
          else hint = 'Калорийность меню выше вашей дневной нормы (следует изъять некоторые продукты)';
        } else {
          hint = 'Меню соответствует';
        }
      }
      return hint;
    }
  }
}
</script>

