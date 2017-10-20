<template>
  <div id="app">
    <app-header></app-header>
    <main>
      <app-calculator></app-calculator>
      <app-products></app-products>
    </main>
    <app-footer></app-footer>
    <el-dialog :visible.sync="authVisible" :close-on-click-modal="false" :close-on-press-escape="false" custom-class="auth">
      <app-auth></app-auth>
    </el-dialog>
  </div>
</template>

<script>
import { bus } from "./main";
import Header from "./components/Header.vue";
import Products from "./components/Products.vue";
import Calculator from "./components/Calculator.vue";
import Footer from "./components/Footer.vue";
import Auth from "./components/Auth.vue";

export default {
  components: {
    "app-header": Header,
    "app-products": Products,
    "app-calculator": Calculator,
    "app-footer": Footer,
    "app-auth": Auth
  },
  data() {
    return {
      user: null,
      authVisible: false
    };
  },
  created: function() {
    bus.$on("show-auth", data => {
      this.authVisible = data;
    });
  }
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
  font-family: "Open Sans", sans-serif;
  margin-bottom: 60px;
  backface-visibility: hidden;
}

.auth {
  width: 350px;
}
</style>
