<template>
  <div class="calculator">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :label-position="'top'">
          <el-form-item label="Пол">
            <el-select v-model="gender" value-key="id" placeholder="" size="small" clearable>
              <el-option v-for="item in genderOptions" :key="item.id" :label="item.title" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Рост">
            <el-input-number v-model="height" :min="1" :max="300" size="small"></el-input-number>
          </el-form-item>
          <el-form-item label="Вес">
            <el-input-number v-model="weight" :min="1" :max="300" size="small"></el-input-number>
          </el-form-item>
          <el-form-item label="Возраст">
            <el-input-number v-model="age" :min="1" :max="150" size="small"></el-input-number>
          </el-form-item>
          <el-form-item label="Уровень физической активности">
            <el-select v-model="activity" value-key="id" placeholder="" size="small" clearable>
              <el-option v-for="item in activityOptions" :key="item.id" :label="item.title" :value="item.val"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="calculator-btn-item">
            <el-button size="small" type="info" @click="getBMR">Рассчитать</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-alert v-if="BMR" :title="BMR.toString()" :closable="false" description="Дневная норма калорий для заданых параметров"></el-alert>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { bus } from '../main'

export default {
  data() {
    return {
      genderOptions: [
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
      activityOptions: [
        { id: 0, val: 1.2, title: 'Минимальный' },
        { id: 1, val: 1.375, title: 'Низкий' },
        { id: 2, val: 1.55, title: 'Средний' },
        { id: 3, val: 1.725, title: 'Высокий' },
        { id: 4, val: 1.9, title: 'Очень высокий' }
      ],
      gender: '',
      activity: '',
      height: null,
      weight: null,
      age: null,
      BMR: null
    }
  },
  methods: {
    getBMR() {
      this.BMR = Math.floor(
        (this.gender.ratio.def +
          this.gender.ratio.w * this.weight +
          this.gender.ratio.h * this.height -
          this.gender.ratio.a * this.age) *
          this.activity
      )
      bus.$emit('bmr-getted', this.BMR)
    }
  }
}
</script>
<style lang="scss">
.calculator-btn-item {
  vertical-align: bottom !important;
}
</style>
