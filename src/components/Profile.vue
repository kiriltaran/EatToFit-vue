<template>
  <div class="profile" v-if="user">
    <img v-if="user.photoURL" :src="user.photoURL" alt="avatar" class="photo profile-avatar">
    <div v-else class="initials profile-avatar">{{user.displayName[0].toUpperCase()}}</div>
    <div class="profile-name">{{user.displayName}}</div>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod nisi magnam, sunt placeat voluptates, dolores deleniti impedit quasi consequuntur assumenda natus incidunt? Minus officiis sed maxime esse cum doloribus doloremque aut nesciunt rem perspiciatis odio neque minima corrupti sapiente id quibusdam quidem labore qui, dolorum quae obcaecati, fuga temporibus ipsum? Ab totam dignissimos, quod ratione sapiente blanditiis, velit molestias nostrum ipsa iusto mollitia commodi ea facere? Cupiditate recusandae accusamus ratione aperiam optio facilis dolore numquam officiis et! Voluptas adipisci, sunt officia eos neque qui quam eius? Perferendis omnis natus veritatis quas? Consequatur, aliquam quidem. Consequatur accusamus ut veniam assumenda qui.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  &-avatar {
    display: inline-block;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    border-radius: 50%;
    background: #8bc53d;
    color: #fff;
    font-size: 48px;
  }
  &-name {
    display: inline-block;
    font-size: 48px;
    margin-left: 30px;
  }
}
</style>