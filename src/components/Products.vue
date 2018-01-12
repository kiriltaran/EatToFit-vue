<template>
  <div class="products">
    <el-row type="flex" justify="space-around">
      <el-col :span="13">
        <products-select></products-select>
      </el-col>
      <!-- <el-col :span="13">
        <products-list></products-list>
      </el-col> -->
      <el-col :span="10">
        <products-menu></products-menu>
        <products-hint></products-hint>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProductsSelect from './ProductsSelect.vue';
import ProductsList from './ProductsList.vue';
import ProductsMenu from './Menu.vue';
import ProductsHint from './Hint.vue';

export default {
  components: {
    ProductsSelect,
    ProductsList,
    ProductsHint,
    ProductsMenu,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped></style>