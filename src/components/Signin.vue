<template>
  <el-form :model="signinForm" ref="signinForm" :rules="rules">
    <el-form-item label="Email" prop="email">
      <el-input v-model="signinForm.email" type="email"></el-input>
    </el-form-item>
    <el-form-item label="Пароль" prop="password">
      <el-input v-model="signinForm.password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" plain @click="validateForm('signinForm')" class="submit">Войти</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      signinForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          {
            required: true,
            type: 'email',
            message: 'Обязательное поле для заполнения',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Обязательное поле для заполнения',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    validateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.signinUser();
        } else {
          return false;
        }
        return true;
      });
    },
    signinUser() {
      this.$store.dispatch('signinUser', {
        email: this.signinForm.email,
        password: this.signinForm.password,
      });
      this.signinForm.email = '';
      this.signinForm.password = '';
    },
  },
};
</script>

<style lang="scss">
.submit {
  width: 100%;
}
</style>


