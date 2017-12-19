<template>
  <el-row type="flex" justify="space-around">
    <!-- <el-col :span="13">
      <el-autocomplete v-model="state" :fetch-suggestions="querySearch" value-key="title" placeholder="Введите название продукта"
        @select="handleSelect"></el-autocomplete>
    </el-col> -->
    <el-col :span="13">
      <products-list></products-list>
    </el-col>
    <el-col :span="10">
      <products-menu></products-menu>
      <products-hint></products-hint>
    </el-col>
  </el-row>
</template>

<script>
import ProductsList from './ProductsList.vue';
import ProductsMenu from './Menu.vue';
import ProductsHint from './Hint.vue';

export default {
  components: {
    ProductsList,
    ProductsHint,
    ProductsMenu,
  },
  data() {
    return {
      state: '',
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var links = this.products;
      var results = queryString ? links.filter(this.createFilter(queryString)) : links;
      cb(results);
    },
    createFilter(queryString) {
      return link => {
        return link.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    handleSelect(item) {
      console.log(item);
    },
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
    menuCal() {
      let cal = 0;
      this.products.forEach(product => {
        if (product.inMenu) cal += product.cal;
      });
      return cal;
    },
  },
};
</script>

<style lang="scss" scoped></style>
