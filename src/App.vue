<template>
  <div id="app">
    <app-header></app-header>
    <main class="main">
      <div class="container-fluid">
        <app-calculator></app-calculator>
        <app-products></app-products>
        <app-hint></app-hint>
      </div>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Products from './components/Products.vue'
import Calculator from './components/Calculator.vue'
import Footer from './components/Footer.vue'
import Hint from './components/Hint.vue'

export default {
  data() {
    return {}
  },
  components: {
    'app-header': Header,
    'app-products': Products,
    'app-calculator': Calculator,
    'app-footer': Footer,
    'app-hint': Hint
  }
}
</script>

<style lang="scss">
html {
  position: relative;
  min-height: 100%;
}


body {
  background-color: #eee;
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 60px;
  webkit-font-smoothing: subpixel-antialiased !important;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
}
</style>
