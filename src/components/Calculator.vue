<template>
  <form @submit.prevent="getBMR">
    <div class="form-group row">
      <div class="col-md-3">
        <label for="height">Рост(см)</label>
        <input id="height" class="form-control input-sm" type="number" min="1" max="250" v-model="height" placeholder="Рост" required>
      </div>
      <div class="col-md-3">
        <label for="height">Вес(кг)</label>
        <input id="weight" class="form-control input-sm" type="number" min="1" max="250" v-model="weight" placeholder="Вес" required>
      </div>
      <div class="col-md-3">
        <label for="height">Возраст</label>
        <input id="age" class="form-control input-sm" type="number" min="1" max="100" v-model="age" placeholder="Возраст" required>
      </div>
      <div class="col-md-3">
        <label>. </label>
        <input class="btn btn-info btn-sm col-md-12" v-bind:class="{ disabled: !height || !weight || !age}" type="submit" value="Рассчитать">
      </div>
    </div>
    <span class="help-block">Рассчитать дневную норму каллорий</span><span>{{BMR}}</span>
  </form>
</template>

<script>
import { bus } from '../main'

export default {
  data() {
    return {
      height: null,
      weight: null,
      age: null,
      BMR: null
    }
  },
  methods: {
    getBMR: function () {
      this.BMR = 88.36 + (13.4 * this.weight) + (4.8 * this.height) - (5.7 * this.age);
      bus.$emit('bmr-getted', this.BMR);
    }
  }
}
</script>