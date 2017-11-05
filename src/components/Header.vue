<template>
  <header class="header">
    <div class="header-inner">
      <h1 class="header-title">EatToFit</h1>
      <div class="auth">
        <div class="auth-user" v-if="user">
          <img :src="user.photoURL" alt="avatar" class="auth-user-avatar">
          <el-button type="text">{{user.displayName}}</el-button>
          <el-button type="text" @click="logout">Выход</el-button>
        </div>
        <el-button type="text" @click="showAuth" v-else>Авторизация</el-button>
      </div>
    </div>
  </header>
</template>

<script>
import bus from '../main';

export default {
  data() {
    return {};
  },
  methods: {
    showAuth() {
      bus.$emit('show-auth', true);
    },
    logout() {
      this.$store.dispatch('logout');
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style lang="scss">
.header {
  position: relative;
  height: 210px;
  background-image: url('../assets/img/bg1.jpg');
  text-align: center;

  &-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);

    .header-title {
      font-size: 100px;
      font-weight: 600;
      line-height: 210px;
      color: #5bc0de;
      text-shadow: 1px 1px 2px black;
      margin: 0;
    }

    .auth {
      display: block;
      position: absolute;
      bottom: 0px;
      right: 25px;
      height: 50px;
      line-height: 50px;
      &-user-avatar {
        display: inline-block;
        border-radius: 50%;
        width: 50px;
        vertical-align: middle;
      }
    }
  }
}
</style>