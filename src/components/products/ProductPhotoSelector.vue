<template>
  <div 
    v-loading="loading" 
    class="product-photo-selector">
    <el-row type="flex">
      <el-col 
        v-for="image in images" 
        :key="image" 
        :span="6">
        <img 
          :src="image" 
          alt="productPhoto" 
          class="photo"
          @click="selectPhoto(image)" 
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '../../api';

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
  mounted() {
    this.fetchProductPhotos();
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
          this.$emit('photo-selected', '');
        }
        this.loading = false;
      } catch (e) {
        this.$emit('photo-selected', '');
        this.loading = false;
      }
    },
    selectPhoto(image) {
      this.$emit('photo-selected', image);
      this.loading = false;
    },
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
