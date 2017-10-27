<template>
  <div class="hint">
    <el-alert v-if="hint.text" :title="hint.text" :type="hint.type" :closable="false"></el-alert>
    <div>{{menuCal}}</div>
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
  props: ['menuCal'],
  created() {
    bus.$on('bmr-getted', data => {
      this.BMR = data
    })
    bus.$on('menuCal-getted', data => {
      this.menuCal = data
    })
  },
  computed: {
    hint() {
      const hint = {
        text: '',
        type: ''
      }
      if (this.BMR && this.menuCal) {
        hint.type = 'success'
        if (Math.abs(this.BMR - this.menuCal) > 100) {
          hint.type = 'warning'
          if (this.BMR > this.menuCal)
            hint.text =
              'Калорийность меню ниже вашей дневной нормы (следует добавить продукты в рацион)'
          else
            hint.text =
              'Калорийность меню выше вашей дневной нормы (следует изъять некоторые продукты)'
        } else {
          hint.text = 'Меню соответствует'
        }
      }
      return hint
    }
  }
}
</script>

<style lang="scss">
.hint {
  margin-top: 5px;
}
</style>


