<template>
  <el-form :model="signinForm" ref="signinForm" :rules="rules">
    <el-form-item label="Email" prop="email">
      <el-input v-model="signinForm.email" type="email"></el-input>
    </el-form-item>
    <el-form-item label="Пароль" prop="password">
      <el-input v-model="signinForm.password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="validateForm('signinForm')" class="submit">Войти</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import firebase from 'firebase'
// import { bus } from '../main'

export default {
  data() {
    return {
      signinForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Обязательное поле для заполнения',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Обязательное поле для заполнения',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    validateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.signinUser()
        } else {
          return false
        }
        return true
      })
    },
    signinUser() {
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.signinForm.email,
          this.signinForm.password
        )
        .then(response => {
          console.log(response)
        })
    }
  }
}
</script>

<style lang="scss">
.submit {
  width: 100%;
}
</style>


