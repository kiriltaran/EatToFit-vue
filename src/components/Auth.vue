<template>
  <div class="auth">
    <auth-signin></auth-signin>
    <!-- <auth-signup></auth-signup> -->
  </div>
</template>

<script>
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'

export default {
  data() {
    return {}
  },
  components: {
    'auth-signin': SignIn,
    'auth-signup': SignUp,
  }
}
</script>

<style lang="scss">

</style>


