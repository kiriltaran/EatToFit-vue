<template>
  <div class="main-component">
    <calculator-component :user="user" :class="user ? '' : 'centered'" class="calculator-component"></calculator-component>
    <transition name="fade">
      <products-component v-if="user"></products-component>
    </transition>
  </div>
</template>

<script>
import ProductsComponent from './products/ProductsComponent.vue';
import CalculatorComponent from './CalculatorComponent.vue';

export default {
  components: {
    ProductsComponent,
    CalculatorComponent,
  },
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.calculator-component {
  margin-bottom: 20px;
  transition: margin 0.5s;
}

.centered {
  margin-top: 200px;
}
</style>
