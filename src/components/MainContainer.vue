<template>
    <div class="main-container">
      <calculator-container :user="user" :class="user ? '' : 'centered'" class="calculator-container"></calculator-container>
      <transition name="fade">
        <products-container v-if="user"></products-container>
      </transition>
    </div>
</template>

<script>
import ProductsContainer from './products/ProductsContainer.vue';
import CalculatorContainer from './CalculatorContainer.vue';

export default {
  components: {
    ProductsContainer,
    CalculatorContainer,
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

.calculator-container {
  margin-bottom: 20px;
  transition: margin 0.5s;
}

.centered {
  margin-top: 200px;
}
</style>
