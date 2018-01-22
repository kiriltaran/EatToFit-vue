<template>
  <div id="app">
    <header-component></header-component>
    <main class="main">
      <calculator-component :user="user" :class="user ? '' : 'centered'" class="calculator-component"></calculator-component>
      <transition name="fade">
        <products-component v-if="user"></products-component>
      </transition>
    </main>
    <footer-component></footer-component>
    <el-dialog :visible.sync="authVisible" :width="'350px'" :close-on-click-modal="false">
      <auth-component v-loading="loading"></auth-component>
    </el-dialog>
    <el-dialog :visible.sync="profileVisible" :close-on-click-modal="false">
      <user-profile></user-profile>
    </el-dialog>
  </div>
</template>

<script>
import bus from './main';
import HeaderComponent from './components/HeaderComponent.vue';
import ProductsComponent from './components/ProductsComponent.vue';
import CalculatorComponent from './components/CalculatorComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import AuthComponent from './components/AuthComponent.vue';
import UserProfile from './components/UserProfile.vue';

export default {
  components: {
    HeaderComponent,
    ProductsComponent,
    CalculatorComponent,
    FooterComponent,
    AuthComponent,
    UserProfile,
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
    loading() {
      return this.$store.getters.loading;
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
  padding: 40px 10px 0;
}

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
