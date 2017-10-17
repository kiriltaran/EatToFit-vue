<template>
  <el-form :model="signupForm">
    <el-form-item label="Email">
      <el-input v-model="signupForm.email" type="email"></el-input>
    </el-form-item>
    <el-form-item label="Пароль">
      <el-input v-model="signupForm.password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="signupUser">Регистрация</el-button>
    </el-form-item>
  </el-form>
  </form>
</template>

<script>
export default {
  data() {
    return {
      signupForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signupUser: function() {
      firebase.auth().createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).catch(function(error) {
        console.log(error);
      });
    }
  }
}
</script>


<style lang="scss">

</style>


