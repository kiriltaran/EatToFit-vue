<template>
  <div class="modal">
    <div class="modal-card">
      <modal-auth></modal-auth>
    </div>
  </div>
</template>

<script>
import Auth from './Auth.vue'

export default {
  data() {
    return {}
  },
  components: {
    'modal-auth': Auth,
  }
}
</script>

<style lang="scss">
.modal {
  display: none;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>


