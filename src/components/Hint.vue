<template>
  <div class="hint">
    <el-alert v-if="getHint.text" :title="getHint.text" :type="getHint.type" :closable="false"></el-alert>
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
      let hint = {
        text: '',
        type: 'success'
      };
      if (this.BMR && this.menuCal) {
        if (Math.abs(this.BMR - this.menuCal) > 100) {
          hint.type = 'warning'
          if (this.BMR > this.menuCal) hint.text = 'Калорийность меню ниже вашей дневной нормы (следует добавить продукты в рацион)';
          else hint.text = 'Калорийность меню выше вашей дневной нормы (следует изъять некоторые продукты)';
        } else {
          hint.text = 'Меню соответствует';
        }
      }
      return hint;
    }
  }
}
</script>

