<template>
  <el-form :inline="true">
    <el-form-item>
      <el-input v-model="newProduct.title" size="small" placeholder="Название продукта"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input-number v-model="newProduct.cal" :min="1" size="small"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-input-number v-model="newProduct.prot" :min="1" size="small"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-input-number v-model="newProduct.fat" :min="1" size="small"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-input-number v-model="newProduct.carbo" :min="1" size="small"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" plain @click="createProduct">Добавить</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'new-product-form',
  data() {
    return {
      newProduct: {
        title: '',
        cal: '',
        prot: '',
        fat: '',
        carbo: '',
      },
    };
  },
  methods: {
    createProduct() {
      if (
        this.newProduct.title &&
        this.newProduct.cal &&
        this.newProduct.prot &&
        this.newProduct.fat &&
        this.newProduct.carbo
      ) {
        const product = {
          title: this.newProduct.title,
          cal: +this.newProduct.cal,
          prot: +this.newProduct.prot,
          fat: +this.newProduct.fat,
          carbo: +this.newProduct.carbo,
        };
        this.$store.dispatch('createProduct', product);
        this.newProduct.title = '';
        this.newProduct.cal = '';
        this.newProduct.prot = '';
        this.newProduct.fat = '';
        this.newProduct.carbo = '';
      }
    },
  },
};
</script>
