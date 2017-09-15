<template>
  <div id="app">
    <app-header></app-header>
    <main>
      <app-calculator></app-calculator>
      <app-products></app-products>
      <app-hint></app-hint>
    </main>
    <app-footer></app-footer>
    <app-modal></app-modal>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Products from './components/Products.vue'
import Calculator from './components/Calculator.vue'
import Footer from './components/Footer.vue'
import Hint from './components/Hint.vue'
import Modal from './components/Modal.vue'


export default {
  data() {
    return {}
  },
  components: {
    'app-header': Header,
    'app-products': Products,
    'app-calculator': Calculator,
    'app-footer': Footer,
    'app-hint': Hint,
    'app-modal': Modal
  }
}
</script>

<style lang="scss">
html {
  position: relative;
  min-height: 100%;
}

body {
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 60px;
  webkit-font-smoothing: subpixel-antialiased !important;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
}
</style>
