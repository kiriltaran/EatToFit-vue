<template>
  <div v-loading="loading" class="product-photo-selector">
    <el-row type="flex">
      <el-col v-for="image in images" :key="image" :span="6">
        <img :src="image" @click="selectPhoto(image)" alt="productPhoto" class="photo">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '../../api';

import bus from '../../main';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      images: [],
    };
  },
  methods: {
    async fetchProductPhotos() {
      this.images.length = 0;
      this.loading = true;
      try {
        const images = await api.getProductPhotos(this.title);
        if (images.length > 0) {
          this.images = images;
        } else {
          bus.$emit('photo-selected', '');
        }
        this.loading = false;
      } catch (e) {
        bus.$emit('photo-selected', '');
        this.loading = false;
      }
    },
    selectPhoto(image) {
      bus.$emit('photo-selected', image);
      this.loading = false;
    },
  },
  mounted() {
    this.fetchProductPhotos();
  },
};
</script>

<style lang="scss" scoped>
.photo {
  width: 90%;
  height: 90%;
  object-fit: contain;
  transition: all 0.5s ease-in-out;
  border: 5px solid transparent;
  &:hover {
    cursor: pointer;
    border-color: #409eff;
  }
}
</style>
