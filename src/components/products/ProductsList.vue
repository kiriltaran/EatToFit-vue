<template>
  <div class="products-list">
    <el-table :data="products" height="415" class="table" empty-text="Зарегистрируйтесь для продолжения работы">
      <el-table-column prop="title" label="Продукт" label-class-name="label-product"></el-table-column>
      <el-table-column prop="cal" label="Калории" label-class-name="label-cal"></el-table-column>
      <el-table-column prop="prot" label="Белки" label-class-name="label-prot"></el-table-column>
      <el-table-column prop="fat" label="Жиры" label-class-name="label-fat"></el-table-column>
      <el-table-column prop="carbo" label="Углеводы" label-class-name="label-carbo"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <i class="add-icon ion-ios-arrow-forward" :class="{ hidden: products[scope.$index].inMenu }" @click="addToMenu(scope.row.id)"></i>
        </template>
      </el-table-column>
    </el-table>
    <new-product-form/>
  </div>
</template>

<script>
export default {
  components: {
    NewProductForm: () => import('./NewProductForm.vue'),
  },
  props: {
    products: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    addToMenu(productId) {
      this.$store.dispatch('toggleInMenu', productId);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-icon {
  cursor: pointer;
  font-size: 25px;

  &:hover {
    color: green;
  }
}

.hidden {
  display: none;
}
</style>
