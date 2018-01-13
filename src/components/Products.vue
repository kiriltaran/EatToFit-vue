<template>
  <div class="products">
    <el-row type="flex" justify="space-around">
      <el-col :span="16">
        <el-card :body-style="{height: '455px'}">
          <!-- <products-select></products-select> -->
          <products-list></products-list>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card>
          <products-menu></products-menu>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProductsSelect from './ProductsSelect.vue';
import ProductsList from './ProductsList.vue';
import ProductsMenu from './Menu.vue';

export default {
  components: {
    ProductsSelect,
    ProductsList,
    ProductsMenu,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>

</style>