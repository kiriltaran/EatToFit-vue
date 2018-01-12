<template>
  <div class="products">
    <el-row type="flex" justify="space-around">
      <el-col :span="16">
        <el-card :body-style="{height: '415px'}">
          <products-select></products-select>
        </el-card>
      </el-col>
      <!-- <el-col :span="13">
        <products-list></products-list>
      </el-col> -->
      <el-col :span="7">
        <el-card>
          <products-menu></products-menu>
          <products-hint></products-hint>
        </el-card>
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

<style lang="scss" scoped>

</style>