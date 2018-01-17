<template>
  <div class="calculator">
    <el-row type="flex" justify="space-around">
      <el-col :span="16">
        <el-card :body-style="{position: 'relative'}">
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
            <el-form-item label="Уровень активности">
              <el-select v-model="activity" value-key="id" placeholder="" size="small" clearable>
                <el-option v-for="item in activityOptions" :key="item.id" :label="item.title" :value="item.val"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Цель">
              <el-select v-model="goal" value-key="id" placeholder="" size="small" clearable>
                <el-option v-for="item in goalOptions" :key="item.id" :label="item.title" :value="item.val"></el-option>
              </el-select>
            </el-form-item>
            <transition name="slide">
              <i v-if="BMR" class="el-icon-d-arrow-right calculator-arrow"></i>
            </transition>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="7">
        <div v-if="BMR > 0" class="calculator-hint">
          <el-alert :title="BMR.toString()" :closable="false" description="Дневная норма калорий для заданой цели и параметров">
            <div class="hint-text">
              Дневная норма калорий для заданой цели и параметров
            </div>
            <el-button size="small" type="primary" plain @click="setBMR" :disabled="bmrSetted" class="hint-btn">Запомнить</el-button>
          </el-alert>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bus from '../main';

export default {
  props: ['user'],
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
            a: 5.7,
          },
        },
        {
          id: 1,
          title: 'Женщина',
          ratio: {
            def: 447.6,
            w: 9.2,
            h: 3.1,
            a: 4.3,
          },
        },
      ],
      activityOptions: [
        {
          id: 0,
          val: 1.2,
          title: 'Минимальный',
        },
        {
          id: 1,
          val: 1.375,
          title: 'Низкий',
        },
        {
          id: 2,
          val: 1.55,
          title: 'Средний',
        },
        {
          id: 3,
          val: 1.725,
          title: 'Высокий',
        },
        {
          id: 4,
          val: 1.9,
          title: 'Очень высокий',
        },
      ],
      goalOptions: [
        {
          id: 0,
          val: 1,
          title: 'Поддержание нормы',
        },
        {
          id: 1,
          val: 0.75,
          title: 'Сброс веса',
        },
        {
          id: 2,
          val: 1.25,
          title: 'Набор веса',
        },
      ],
      gender: '',
      activity: '',
      goal: '',
      height: null,
      weight: null,
      age: null,
    };
  },
  computed: {
    BMR() {
      let BMR = this.user ? this.user.BMR : null;

      if (this.gender && this.activity && this.goal) {
        BMR = Math.floor(
          (this.gender.ratio.def +
            this.gender.ratio.w * this.weight +
            this.gender.ratio.h * this.height -
            this.gender.ratio.a * this.age) *
            this.activity *
            this.goal,
        );
      }
      bus.$emit('bmr-getted', BMR);
      return BMR;
    },
    bmrSetted() {
      return this.user ? this.BMR === this.user.BMR : false;
    },
  },
  methods: {
    setBMR() {
      this.$store.dispatch('setBMR', {
        userId: this.user.id,
        BMR: this.BMR,
      });
    },
  },
};
</script>
<style lang="scss">
.calculator {
  &-arrow {
    font-size: 50px;
    position: absolute;
    top: 50%;
    right: 25px;
    margin-top: -25px;
  }
}

.calculator-hint {
  height: 100%;
  display: flex;
  align-items: center;
}

.hint-text {
  font-size: 13px;
}

.hint-btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20%);
}
</style>
