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
        <twitter-icon w="30px" h="30px"></twitter-icon>
      </el-button>
      <el-button type="text" @click="signInByGithub" class="auth-social">
        <github-icon w="30px" h="30px"></github-icon>
      </el-button>
    </el-row>
  </el-tabs>
</template>

<script>
import TwitterIcon from 'vue-ionicons/dist/logo-twitter.vue';
import GithubIcon from 'vue-ionicons/dist/logo-github.vue';

export default {
  components: {
    TwitterIcon,
    GithubIcon,
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
