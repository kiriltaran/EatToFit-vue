<template>
  <div v-if="user" class="profile">
    {{user.displayName}}
    <img :src="user.photoURL" alt="userPhoto" class="profile-photo">
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      console.log(this.$store.getters.user);
      return this.$store.getters.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  &-photo {
    width: 200px;
    border-radius: 50%;
  }
}
</style>


