<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="Вход" name="signin">
      <el-alert v-if="error" :title="error.message" type="error" @close="clearError" show-icon></el-alert>
      <auth-signin></auth-signin>
    </el-tab-pane>
    <el-tab-pane label="Регистрация" name="signup">
      <el-alert v-if="error" :title="error.message" type="error" @close="clearError" show-icon></el-alert>
      <auth-signup></auth-signup>
    </el-tab-pane>
    <el-row type="flex" justify="center">
      <el-button type="text" @click="signInByTwitter" class="auth-social">
        <i class="ion-social-twitter"></i>
      </el-button>
      <el-button type="text" @click="signInByGithub" class="auth-social">
        <i class="ion-social-github"></i>
      </el-button>
    </el-row>
  </el-tabs>
</template>

<script>
export default {
  components: {
    AuthSignin: () => import('./AuthSignin.vue'),
    AuthSignup: () => import('./AuthSignup.vue'),
  },
  data() {
    return {
      activeTab: 'signin',
    };
  },
  methods: {
    signInByGithub() {
      this.$store.dispatch('signInBySocials', 'github');
    },
    signInByTwitter() {
      this.$store.dispatch('signInBySocials', 'twitter');
    },
    clearError() {
      this.$store.dispatch('clearError');
    },
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
};
</script>

<style lang="scss">
.tabs {
  width: 100%;
}

.auth-social {
  font-size: 30px;
}

.el-tabs {
  &__nav {
    width: 100%;
  }

  &__item {
    text-align: center;
    width: 50%;
  }
}
</style>
