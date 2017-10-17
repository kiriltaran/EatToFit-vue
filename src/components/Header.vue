<template>
  <header class="header">
    <div class="header-inner">
      <h1 class="header-title">EatToFit</h1>
      <el-button type="text" @click="showAuth" class="auth-link">Авторизация</el-button>
    </div>

  </header>
</template>

<script>
import { bus } from '../main'

export default {
  data() {
    return {}
  },
  methods: {
    showAuth: function() {
      bus.$emit('show-auth', true);
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
    background-color: rgba(255, 255, 255, 0.5);

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
      right: 15px;
    }
  }
}
</style>