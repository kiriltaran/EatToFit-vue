<template>
  <form @submit.prevent="calcBMR">
    <div class="form-group row">
      <div class="col-md-2">
        <input class="form-control input-sm" type="number" v-model="height" size="3" placeholder="Рост" required>
      </div>
      <div class="col-md-2">
        <input class="form-control input-sm" type="number" v-model="weight" size="3" placeholder="Вес" required>
      </div>
      <div class="col-md-2">
        <input class="form-control input-sm" type="number" v-model="age" size="3" placeholder="Возраст" required>
      </div>
      <div class="col-md-2">
        <input class="btn btn-info btn-sm col-md-12" v-bind:class="{ disabled: !height || !weight || !age}" type="submit" value="Рассчитать">
      </div>
      <div class="col-md-2">
        <span>{{BMR}}</span>
      </div>
    </div>
    <p class="help-block">Добавить свой продукт</p>
  </form>
</template>

<script>
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
    calcBMR: function () {
      this.BMR = 88.36 + (13.4 * this.weight) + (4.8 * this.height) - (5.7 * this.age);
    }
  }
}
</script>