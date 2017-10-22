<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="Вход" name="signin">
      <auth-signin></auth-signin>
    </el-tab-pane>
    <el-tab-pane label="Регистрация" name="signup">
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
import { bus } from "../main";
import firebase from "firebase";
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";

export default {
  components: {
    "auth-signin": SignIn,
    "auth-signup": SignUp
  },
  data() {
    return {
      activeTab: "signin"
    };
  },
  methods: {
    signInByGithub: function() {
      var provider = new firebase.auth.GithubAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          console.log("github");

          let user = result.user;

          bus.$emit("show-auth", false);
          bus.$emit("user", user);
        })
        .catch(error => {
          console.log(error);
        });
    },
    signInByTwitter: function() {
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          console.log("twitter");

          let user = result.user;

          bus.$emit("show-auth", false);
          bus.$emit("user", user);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
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


