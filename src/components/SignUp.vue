<template>
  <el-form :model="signupForm" ref="signupForm" :rules="rules">
    <el-form-item label="Имя" prop="name">
      <el-input v-model="signupForm.name" type="text"></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="signupForm.email" type="email"></el-input>
    </el-form-item>
    <el-form-item label="Пароль" prop="password">
      <el-input v-model="signupForm.password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="validateForm('signupForm')" class="submit">Регистрация</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import firebase from 'firebase'
import { bus } from '../main'

export default {
  data() {
    return {
      signupForm: {
        name: '',
        email: '',
        password: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Обязательное поле для заполнения',
            trigger: 'blur'
          }
        ],
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
          this.signupUser()
        } else {
          return false
        }
        return true
      })
    },
    signupUser() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.signupForm.email,
          this.signupForm.password
        )
        .then(user => {
          user
            .updateProfile({
              displayName: this.signupForm.name
            })
            .then(() => {
              bus.$emit('user', user)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
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


