<template>
  <div id="app">
    <header-container @open-auth="onOpenAuth"/>
    <main class="main">
      <transition 
        name="el-fade-in" 
        mode="out-in">
        <router-view @open-auth="onOpenAuth"/>
      </transition>
    </main>
    <footer-container/>
    <el-dialog 
      :visible.sync="authVisible" 
      :width="'350px'" 
      :close-on-click-modal="false">
      <auth-container 
        v-loading="loading" 
        @close="onCloseAuth"/>
    </el-dialog>
    <el-dialog 
      :visible.sync="profileVisible" 
      :close-on-click-modal="false">
      <user-profile/>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {
    HeaderContainer: () => import('./components/HeaderContainer.vue'),
    FooterContainer: () => import('./components/FooterContainer.vue'),
    AuthContainer: () => import('./components/auth/AuthContainer.vue'),
    UserProfile: () => import('./components/UserProfile.vue'),
  },
  data() {
    return {
      authVisible: false,
      profileVisible: false,
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    onOpenAuth() {
      this.authVisible = true;
    },
    onCloseAuth() {
      this.authVisible = false;
    },
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
  background: rgba(38, 173, 225, 0.1);
  max-height: 100vh;
}

.main {
  padding-top: 25px;
}

.el-table .cell {
  word-break: normal;
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
