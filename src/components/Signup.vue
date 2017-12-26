<template>
  <el-form status-icon :model="signupForm" ref="signupForm" :rules="rules">
    <el-form-item label="Аватар" prop="avatar">
      <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
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
      <el-button type="primary" plain @click="validateForm('signupForm')" class="submit">Регистрация</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      signupForm: {
        name: '',
        email: '',
        password: '',
        imageUrl: '',
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
    signupUser() {
      this.$store.dispatch('signupUser', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
      });
      this.signupForm.name = '';
      this.signupForm.email = '';
      this.signupForm.password = '';
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!');
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!');
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="scss">
.submit {
  width: 100%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>