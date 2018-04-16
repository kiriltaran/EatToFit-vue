<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane
      label="Вход" 
      name="signin">
      <el-alert 
        v-if="error" 
        :title="error.message"
        type="error"
        show-icon
        @close="clearError" 
      />
      <auth-signin @close="onClose"/>
    </el-tab-pane>
    <el-tab-pane 
      label="Регистрация" 
      name="signup">
      <el-alert 
        v-if="error" 
        :title="error.message" 
        type="error" 
        show-icon
        @close="clearError" 
      />
      <auth-signup @close="onClose"/>
    </el-tab-pane>
    <el-row 
      type="flex" 
      justify="center">
      <el-button 
        type="text" 
        class="auth-social"
        @click="signInByTwitter" 
      >
        <twitter-icon 
          w="30px" 
          h="30px"/>
      </el-button>
      <el-button 
        type="text" 
        class="auth-social"
        @click="signInByGithub" 
      >
        <github-icon 
          w="30px" 
          h="30px"/>
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
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  methods: {
    async signInByGithub() {
      await this.$store.dispatch('signInBySocials', 'github');
      this.$emit('close');
    },
    async signInByTwitter() {
      await this.$store.dispatch('signInBySocials', 'twitter');
      this.$emit('close');
    },
    clearError() {
      this.$store.dispatch('clearError');
    },
    onClose() {
      this.$emit('close');
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
