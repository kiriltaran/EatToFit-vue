<template>
  <header class="header">
    <el-menu 
      :default-active="activeNav" 
      :router="true"
      mode="horizontal" 
      class="menu">
      <div class="title">
        <div class="title-logo"/>
        <span class="title-text">eattofit</span>
      </div>
      <el-menu-item 
        v-if="user"
        index="/" 
      >Калькулятор</el-menu-item>
      <el-menu-item 
        v-if="user"
        index="/stats" 
      >
        Статистика
      </el-menu-item>
      <div class="auth">
        <div 
          v-if="user"
          class="auth-user" 
        >
          <img 
            v-if="user.photoURL" 
            :src="user.photoURL" 
            alt="avatar" 
            class="auth-user-avatar user-icon"
          >
          <div 
            v-else 
            class="auth-user-initials user-icon" 
          >{{ user.displayName[0].toUpperCase() }}</div>
          <el-button 
            type="text" 
          >{{ user.displayName }}</el-button>
          <el-button 
            type="text" 
            class="logout-btn"
            @click="logout" 
          >
            <log-out-icon 
              w="28px" 
              h="28px"/>
          </el-button>
        </div>
        <el-button 
          v-else
          type="text" 
          @click="openAuth" 
        >Авторизация</el-button>
      </div>
    </el-menu>
  </header>
</template>

<script>
import LogOutIcon from 'vue-ionicons/dist/md-log-out.vue';

export default {
  components: {
    LogOutIcon,
  },
  data() {
    return {
      activeNav: '/',
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    openAuth() {
      this.$emit('open-auth');
    },
    logout() {
      this.$store.dispatch('logout');
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
      background-image: url('../assets/logo.png');
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
