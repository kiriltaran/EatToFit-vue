<template>
  <div class="main-container">
    <calculator-container 
      :user="user" 
      class="calculator-container"/>
    <products-container/>
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
.calculator-container {
  margin-bottom: 20px;
  transition: margin 0.5s;
}
</style>
