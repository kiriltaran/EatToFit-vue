<template>
  <div class="calculator">
    <el-row 
      type="flex" 
      justify="space-around">
      <el-col :span="16">
        <el-card :body-style="{position: 'relative'}">
          <el-form 
            :inline="true" 
            :label-position="'top'">
            <el-form-item label="Пол">
              <el-select 
                v-model="gender" 
                value-key="id" 
                placeholder="" 
                size="small" 
                clearable>
                <el-option 
                  v-for="item in genderOptions" 
                  :key="item.id" 
                  :label="item.title" 
                  :value="item"/>
              </el-select>
            </el-form-item>
            <el-form-item label="Рост">
              <el-input-number 
                v-model="height" 
                :min="1" 
                :max="300" 
                size="small"/>
            </el-form-item>
            <el-form-item label="Вес">
              <el-input-number 
                v-model="weight" 
                :min="1" 
                :max="300" 
                size="small"/>
            </el-form-item>
            <el-form-item label="Возраст">
              <el-input-number 
                v-model="age" 
                :min="1" 
                :max="150" 
                size="small"/>
            </el-form-item>
            <el-form-item label="Уровень активности">
              <el-select 
                v-model="activity" 
                value-key="id" 
                placeholder="" 
                size="small" 
                clearable>
                <el-option 
                  v-for="item in activityOptions" 
                  :key="item.id" 
                  :label="item.title" 
                  :value="item.val"/>
              </el-select>
            </el-form-item>
            <el-form-item label="Цель">
              <el-select 
                v-model="goal" 
                value-key="id" 
                placeholder="" 
                size="small" 
                clearable>
                <el-option 
                  v-for="item in goalOptions" 
                  :key="item.id" 
                  :label="item.title" 
                  :value="item.val"/>
              </el-select>
            </el-form-item>
            <transition name="slide">
              <i 
                v-show="isDataFill" 
                class="el-icon-d-arrow-right calculator-arrow"/>
            </transition>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="7">
        <div 
          v-if="bmr > 0" 
          class="calculator-hint">
          <el-alert 
            :title="bmr.toString()" 
            :closable="false" 
            type="warning" 
            description="Дневная норма калорий для заданой цели и параметров">
            <div class="hint-text">
              Дневная норма калорий для заданой цели и параметров
            </div>
            <el-button 
              v-show="user" 
              :type="isBmrSetted ? 'info' : 'primary'" 
              :disabled="isBmrSetted" 
              size="small" 
              plain 
              class="hint-btn"
              @click="rememberUserData" 
            >Запомнить</el-button>
          </el-alert>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default() {
        return null;
      },
    },
  },
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
      height: 1,
      weight: 1,
      age: 1,
    };
  },
  computed: {
    bmr() {
      let bmr = this.user ? this.user.bmr : null;

      if (this.gender && this.activity && this.goal) {
        bmr = Math.floor(
          (this.gender.ratio.def +
            this.gender.ratio.w * this.weight +
            this.gender.ratio.h * this.height -
            this.gender.ratio.a * this.age) *
            this.activity *
            this.goal,
        );
      }
      return bmr;
    },
    isBmrSetted() {
      return this.user ? this.bmr === this.user.bmr : false;
    },
    isDataFill() {
      return this.gender && this.activity && this.goal;
    },
  },
  watch: {
    user(val) {
      if (val) {
        this.setUserData(val);
      } else {
        Object.assign(this.$data, this.$options.data());
      }
    },
  },
  mounted() {
    if (this.user) {
      this.setUserData(this.user);
    }
  },
  methods: {
    setUserData(user) {
      this.gender = user.gender;
      this.height = user.height;
      this.weight = user.weight;
      this.age = user.age;
      this.activity = user.activity;
      this.goal = user.goal;
    },
    rememberUserData() {
      this.$store.dispatch('rememberUserData', {
        gender: this.gender,
        height: this.height,
        weight: this.weight,
        age: this.age,
        activity: this.activity,
        goal: this.goal,
        bmr: this.bmr,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
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
