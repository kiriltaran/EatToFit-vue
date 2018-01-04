<template>
  <div id="app">
    <app-header></app-header>
    <main>
      <app-calculator></app-calculator>
      <app-products></app-products>
    </main>
    <app-footer></app-footer>
    <el-dialog :visible.sync="authVisible" :width="'350px'" :close-on-click-modal="false">
      <app-auth></app-auth>
    </el-dialog>
    <el-dialog :visible.sync="profileVisible" :close-on-click-modal="false">
      <app-profile></app-profile>
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
import AppProfile from './components/Profile.vue';

export default {
  components: {
    AppHeader,
    AppProducts,
    AppCalculator,
    AppFooter,
    AppAuth,
    AppProfile,
  },
  data() {
    return {
      authVisible: false,
      profileVisible: false,
    };
  },
  created() {
    bus.$on('show-auth', data => {
      this.authVisible = data;
    });
    bus.$on('show-profile', data => {
      this.profileVisible = data;
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

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 50px;
}

::-webkit-scrollbar-thumb {
  background: rgba(139, 197, 61, 0.6);
  border-radius: 50px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 197, 61, 1);
}
</style>