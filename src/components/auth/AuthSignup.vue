<template>
  <el-form 
    ref="signupForm" 
    :model="signupForm" 
    :rules="rules"
    status-icon >
    <el-form-item 
      label="Имя" 
      prop="name">
      <el-input 
        v-model="signupForm.name" 
        type="text"/>
    </el-form-item>
    <el-form-item 
      label="Email" 
      prop="email">
      <el-input 
        v-model="signupForm.email" 
        type="email"/>
    </el-form-item>
    <el-form-item 
      label="Пароль" 
      prop="password">
      <el-input 
        v-model="signupForm.password" 
        type="password"/>
    </el-form-item>
    <el-form-item>
      <el-button 
        type="primary" 
        plain 
        class="submit"
        @click="validateForm('signupForm')" 
      >Регистрация</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import router from '../../router';

export default {
  data() {
    return {
      signupForm: {
        name: '',
        email: '',
        password: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Обязательное поле для заполнения',
            trigger: 'blur',
          },
        ],
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
          this.signupUser();
        } else {
          return false;
        }
        return true;
      });
    },
    async signupUser() {
      try {
        await this.$store.dispatch('signupUser', {
          email: this.signupForm.email,
          password: this.signupForm.password,
          name: this.signupForm.name,
        });
        this.$emit('close');
        router.push({ path: '/' });
        this.signupForm.name = '';
        this.signupForm.email = '';
        this.signupForm.password = '';
      } catch (e) {
        window.console.log(e);
      }
    },
  },
};
</script>

<style lang="scss">
.submit {
  width: 100%;
}
</style>
