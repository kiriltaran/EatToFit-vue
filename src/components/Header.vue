<template>
  <header class="header">
    <div class="header-inner"></div>
    <el-row type="flex" align="middle" justify="space-between">
      <div class="el-col">
        <div class="title">
          <div class="title-logo"></div>
          <span class="title-text">eattofit</span>
        </div>
      </div>
      <div class="el-col">
        <div class="auth">
          <div class="auth-user" v-if="user">
            <img :src="user.photoURL" alt="avatar" class="auth-user-avatar">
            <el-button type="text">{{user.displayName}}</el-button>
            <el-button type="text" @click="logout">Выход</el-button>
          </div>
          <el-button type="text" @click="showAuth" v-else>Авторизация</el-button>
        </div>
      </div>
    </el-row>
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
  background-image: url('../assets/img/bg1.jpg');
  height: 80px;
  line-height: 80px;
  margin-bottom: 80px;
  &-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
  }
  .title {
    margin-left: 30px;
    font-size: 28px;
    color: #8bc53d;
    display: flex;
    align-items: center;
    &-logo {
      background-image: url('../assets/img/logo.png');
      background-size: cover;
      width: 60px;
      height: 60px;
    }
    &-text {
      margin-left: 5px;
      font-size: 40px;
    }
  }
  .auth {
    margin-right: 30px;
    &-user-avatar {
      border-radius: 50%;
      width: 50px;
      vertical-align: middle;
    }
  }
}
</style>