<template>
  <header class="header">
    <el-menu :default-active="activeNav" mode="horizontal" :router="true" class="menu">
      <div class="title">
        <div class="title-logo"></div>
        <span class="title-text">eattofit</span>
      </div>
      <el-menu-item index="/" v-if="user">Калькулятор</el-menu-item>
      <el-menu-item index="/stats" v-if="user">
        Статистика
      </el-menu-item>
      <div class="auth">
          <div class="auth-user" v-if="user">
            <img v-if="user.photoURL" :src="user.photoURL" alt="avatar" class="auth-user-avatar user-icon" @click="showProfile">
            <div v-else class="auth-user-initials user-icon" @click="showProfile">{{user.displayName[0].toUpperCase()}}</div>
            <el-button type="text" @click="showProfile">{{user.displayName}}</el-button>
            <el-button type="text" @click="logout" class="logout-btn">
              <i class="ion-log-out"></i>
            </el-button>
          </div>
          <el-button type="text" @click="showAuth" v-else>Авторизация</el-button>
        </div>
    </el-menu>
    <!-- <div class="header-inner"></div>
    <el-row type="flex" align="middle" justify="space-between">
      <el-col>
        <div class="title">
          <div class="title-logo"></div>
          <span class="title-text">eattofit</span>
        </div>
      </el-col>
      <router-link to="/">Калькулятор</router-link>
      <router-link to="/stats">Статистика</router-link>
      <el-col :span="4">
        <div class="auth">
          <div class="auth-user" v-if="user">
            <img v-if="user.photoURL" :src="user.photoURL" alt="avatar" class="auth-user-avatar user-icon" @click="showProfile">
            <div v-else class="auth-user-initials user-icon" @click="showProfile">{{user.displayName[0].toUpperCase()}}</div>
            <el-button type="text" @click="showProfile">{{user.displayName}}</el-button>
            <el-button type="text" @click="logout" class="logout-btn">
              <i class="ion-log-out"></i>
            </el-button>
          </div>
          <el-button type="text" @click="showAuth" v-else>Авторизация</el-button>
        </div>
      </el-col>
    </el-row> -->
  </header>
</template>

<script>
import bus from '../main';

export default {
  data() {
    return {
      activeNav: '/',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
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
  .menu {
    display: flex;
  }
  .title {
    margin-left: 30px;
    font-size: 28px;
    color: #8bc53d;
    display: flex;
    align-items: center;
    flex-grow: 1;
    &-logo {
      background-image: url('../assets/img/logo.png');
      background-size: cover;
      width: 50px;
      height: 50px;
    }
    &-text {
      margin-left: 5px;
      font-size: 40px;
    }
  }
  .auth {
    display: flex;
    align-items: center;
    margin-right: 30px;
    margin-left: 20px;
    &-user {
      height: 100%;
      display: flex;
      align-items: center;
      .user-icon {
        margin-right: 5px;
        border-radius: 50%;
        width: 50px;
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
        margin-left: 40px;
      }
    }
  }
}
</style>
