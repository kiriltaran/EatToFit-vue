<template>
  <div class="products-select">
      <el-autocomplete v-model="state" :fetch-suggestions="querySearch" value-key="title" placeholder="Введите название продукта"
        @select="handleSelect"></el-autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: '',
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
      this.state = '';
    },
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
  },
};
</script>

<style lang="scss" scoped></style>