<template>
  <div class="new-product-form">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="title" size="small" placeholder="Название продукта"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="cal" :min="1" size="small"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="prot" :min="1" size="small"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="fat" :min="1" size="small"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="carbo" :min="1" size="small"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" plain @click="openPhotoSelector">Добавить</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :title="`Выберите подходящее фото для продукта '${title}'`" :visible.sync="showPhotoSelector" v-if="showPhotoSelector" :show-close="false" :close-on-click-modal="false">
      <products-photo-selector :title="title"></products-photo-selector>
    </el-dialog>
  </div>
</template>

<script>
import bus from '../../main';

export default {
  name: 'new-product-form',
  components: {
    ProductsPhotoSelector: () => import('./ProductPhotoSelector.vue'),
  },
  data() {
    return {
      title: '',
      cal: 1,
      prot: 1,
      fat: 1,
      carbo: 1,
      photo: '',
      showPhotoSelector: false,
    };
  },
  methods: {
    openPhotoSelector() {
      if (this.title) {
        this.showPhotoSelector = true;
      }
    },
    createProduct() {
      if (this.title) {
        const product = {
          title: this.title,
          cal: +this.cal,
          prot: +this.prot,
          fat: +this.fat,
          carbo: +this.carbo,
          photo: this.photo,
        };

        this.$store.dispatch('createProduct', product);
        this.showPhotoSelector = false;
        this.title = '';
        this.cal = 1;
        this.prot = 1;
        this.fat = 1;
        this.carbo = 1;
        this.photo = '';
      }
    },
  },
  mounted() {
    bus.$on('photo-selected', data => {
      this.photo = data;
      this.createProduct();
    });
  },
};
</script>
