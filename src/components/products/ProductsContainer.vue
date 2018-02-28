<template>
  <div class="products">
    <el-row type="flex" justify="space-around">
      <el-col :span="16">
        <el-card :body-style="{position: 'relative', height: '495px'}">
          <el-switch v-model="tableView" active-text="Расширенный" inactive-text="Простой" inactive-color="#409EFF" class="products-switch">
          </el-switch>
          <transition name="fade" mode="out-in">
            <products-list v-if="tableView" :products="products"></products-list>
            <products-selector v-else :products="products"></products-selector>
          </transition>
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
export default {
  components: {
    ProductsSelector: () => import('./ProductsSelector.vue'),
    ProductsList: () => import('./ProductsList.vue'),
    ProductsMenu: () => import('./ProductsMenu.vue'),
  },
  data() {
    return {
      tableView: false,
    };
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
  },
};
</script>

<style lang="scss" scoped>
.products {
  &-switch {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
