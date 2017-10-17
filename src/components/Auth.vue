<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="Вход" name="signin">
      <auth-signin></auth-signin>
    </el-tab-pane>
    <el-tab-pane label="Регистрация" name="signup">
      <auth-signup></auth-signup>
    </el-tab-pane>
    <el-button type="text" @click="signInByTwitter" class="auth-social">
      <i class="ion-social-twitter"></i>
    </el-button>
    <el-button type="text" @click="signInByGithub" class="auth-social">
      <i class="ion-social-github"></i>
    </el-button>
  </el-tabs>
</template>

<script>
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'

export default {
  components: {
    'auth-signin': SignIn,
    'auth-signup': SignUp,
  },
  data() {
    return {
      activeTab: 'signin'
    }
  },
  methods: {
    signInByGithub: function() {
      var provider = new firebase.auth.GithubAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log(result);
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    },
    signInByTwitter: function() {
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }
  }
}
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


