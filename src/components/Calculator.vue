<template>
  <div class="container-fluid">
    <form @submit.prevent="getBMR">
      <div class="form-group row">
        <div class="col-md-2">
          <label for="gender">Пол</label>
          <select id="gender" class="form-control input-sm" required v-model="gender">
            <option v-for="gender in genderTypes" :key="gender.id" :value="gender">{{gender.title}}</option>
          </select>
        </div>
        <div class="col-md-2">
          <label for="height">Рост(см)</label>
          <input id="height" class="form-control input-sm" type="number" min="1" max="250" v-model="height" placeholder="Рост" required>
        </div>
        <div class="col-md-2">
          <label for="height">Вес(кг)</label>
          <input id="weight" class="form-control input-sm" type="number" min="1" max="250" v-model="weight" placeholder="Вес" required>
        </div>
        <div class="col-md-2">
          <label for="height">Возраст</label>
          <input id="age" class="form-control input-sm" type="number" min="1" max="100" v-model="age" placeholder="Возраст" required>
        </div>
        <div class="col-md-2">
          <label for="activity">Уровень физической активности</label>
          <select id="activity" class="form-control input-sm" required v-model="activity">
            <option v-for="activity in activityTypes" :key="activity.id" :value="activity.val">{{activity.title}}</option>
          </select>
        </div>
        <div class="col-md-2">
          <label>. </label>
          <input class="btn btn-info btn-sm col-md-12" v-bind:class="{ disabled: !height || !weight || !age}" type="submit" value="Рассчитать">
        </div>
      </div>
      <span class="help-block">Рассчитать дневную норму каллорий</span>
      <span>{{BMR}}</span>
    </form>
  </div>
</template>

<script>
import { bus } from '../main'

export default {
  data() {
    return {
      genderTypes: [
        {
          id: 0,
          title: 'Мужчина',
          ratio: {
            def: 88.36,
            w: 13.4,
            h: 4.8,
            a: 5.7
          }
        },
        {
          id: 1,
          title: 'Женщина',
          ratio: {
            def: 447.6,
            w: 9.2,
            h: 3.1,
            a: 4.3
          }
        }
      ],
      activityTypes: [
        { id: 0, val: 1.2, title: 'Минимальный' },
        { id: 1, val: 1.375, title: 'Низкий' },
        { id: 2, val: 1.55, title: 'Средний' },
        { id: 3, val: 1.725, title: 'Высокий' },
        { id: 4, val: 1.9, title: 'Очень высокий' }
      ],
      gender: null,
      activity: null,
      height: null,
      weight: null,
      age: null,
      BMR: null
    }
  },
  methods: {
    getBMR: function() {
      this.BMR = (this.gender.ratio.def + (this.gender.ratio.w * this.weight) + (this.gender.ratio.h * this.height) - (this.gender.ratio.a * this.age)) * this.activity;
      bus.$emit('bmr-getted', this.BMR);
    }
  }
}
</script>