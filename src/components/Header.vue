<template>
  <header class="header">
    <div class="header-inner">
      <h1 class="header-title">EatToFit</h1>
      <a href="#" class="auth-link">Авторизация</a>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    signInUser: function() {
      firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(response => {
          console.log(response);
        })
    },
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
.header {
  position: relative;
  height: 250px;
  background-image: url('../assets/img/bg1.jpg');
  text-align: center;
  margin-bottom: 20px;

  &-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);

    .header-title {
      font-size: 100px;
      font-weight: 600;
      line-height: 250px;
      color: #5bc0de;
      text-shadow: 1px 1px 2px black;
      margin: 0;
    }

    .auth-link {
      display: block;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>