<template>
  <div class="hint">
    {{getHint}}
  </div>
</template>

<script>
import { bus } from '../main'

export default {
  data() {
    return {
      menuCal: null,
      BMR: null
    }
  },
  created: function() {
    bus.$on('bmr-getted', (data) => {
      this.BMR = data;
    });
    bus.$on('menuCal-getted', (data) => {
      this.menuCal = data;
    });
  },
  computed: {
    getHint: function() {
      let hint = null;
      if (this.BMR && this.menuCal) {
        if (Math.abs(this.BMR - this.menuCal) > 100) {
          if (this.BMR > this.menuCal) hint = 'Калорийность меню ниже вашей дневной нормы (следует добавить продукты в рацион)';
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

