<template>
  <div class="products-select">
      <el-autocomplete v-model="productsInput" prefix-icon="el-icon-search" :fetch-suggestions="querySearch" value-key="title" placeholder="Введите название продукта"
        @select="handleSelect" class="products-input"></el-autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productsInput: '',
    };
  },
  methods: {
    querySearch(queryString, cb) {
      const products = this.products.filter(product => product.inMenu === false);
      const results = queryString ? products.filter(this.createFilter(queryString)) : products;
      cb(results);
    },
    createFilter(queryString) {
      return link => link.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    },
    handleSelect(item) {
      this.$store.dispatch('toggleInMenu', item.id);
      this.productsInput = '';
    },
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
  },
};
</script>

<style lang="scss" scoped>
.products-input {
  width: 300px;
}
</style>
