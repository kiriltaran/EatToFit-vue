<template>
  <div id="app">
    <app-header></app-header>
    <main>
      <app-calculator></app-calculator>
      <app-products></app-products>
    </main>
    <app-footer></app-footer>
    <el-dialog :visible.sync="authVisible" :close-on-click-modal="false" custom-class="auth-modal">
      <app-auth></app-auth>
    </el-dialog>
  </div>
</template>

<script>
import bus from './main';
import AppHeader from './components/Header.vue';
import AppProducts from './components/Products.vue';
import AppCalculator from './components/Calculator.vue';
import AppFooter from './components/Footer.vue';
import AppAuth from './components/Auth.vue';

export default {
  components: {
    AppHeader,
    AppProducts,
    AppCalculator,
    AppFooter,
    AppAuth,
  },
  data() {
    return {
      authVisible: false,
    };
  },
  created() {
    bus.$on('show-auth', data => {
      this.authVisible = data;
    });
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html {
  position: relative;
  min-height: 100%;
}

body {
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 60px;
  backface-visibility: hidden;
}

.auth-modal {
  width: 350px;
}
</style>