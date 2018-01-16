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
            <img v-if="user.photoURL" :src="user.photoURL" alt="avatar" class="auth-user-avatar user-icon" @click="showProfile">
            <div v-else class="auth-user-initials user-icon" @click="showProfile">{{user.displayName[0].toUpperCase()}}</div>
            <el-button type="text" @click="showProfile">{{user.displayName}}</el-button>
            <el-button type="text" @click="logout" class="logout-btn"><i class="ion-log-out"></i></el-button>
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
    showProfile() {
      bus.$emit('show-profile', true);
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

<style lang="scss" scoped>
.header {
  position: relative;
  background-image: url('../assets/img/bg1.jpg');
  height: 80px;
  line-height: 80px;
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
    &-user {
      .user-icon {
        border-radius: 50%;
        width: 50px;
        vertical-align: middle;
        transition: transform 0.2s;
        &:hover {
          cursor: pointer;
          transform: scale(1.05);
        }
      }
      &-initials {
        display: inline-block;
        background: #8bc53d;
        color: #fff;
        font-size: 24px;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
      .logout-btn {
        font-size: 28px;
        vertical-align: middle;
        margin-left: 40px;
      }
    }
  }
}
</style>