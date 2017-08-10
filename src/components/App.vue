<template>
  <div id="app">
    <app-header></app-header>
    <main class="main">
      <div class="container-fluid">
        <calculator></calculator>
        <products></products>
      </div>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './Header.vue'
import Products from './Products.vue'
import Calculator from './Calculator.vue'
import AppFooter from './Footer.vue'

export default {
  data() {
    return {}
  },
  components: {
    AppHeader,
    Products,
    Calculator,
    AppFooter
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
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
}
</style>
