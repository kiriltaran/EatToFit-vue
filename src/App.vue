<template>
  <div id="app">
    <app-header></app-header>
    <main class="main">
      <app-calculator :class="user ? '' : 'centered'" class="calculator"></app-calculator>
      <transition name="fade">
        <app-products v-if="user"></app-products>
      </transition>
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
  computed: {
    user() {
      return this.$store.getters.user;
    },
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
  overflow: hidden;
}

.main {
  padding: 40px 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.calculator {
  transition: all 0.5s ease-in-out;
}

.centered {
  margin-top: 200px;
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