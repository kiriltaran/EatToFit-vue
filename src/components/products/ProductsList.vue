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
          <el-button type="success" round plain class="add-btn" :class="{ hidden: products[scope.$index].inMenu }" @click="addToMenu(scope.row.id)">
            <arrow-right-icon w="15px" h="15px"></arrow-right-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <new-product-form/>
  </div>
</template>

<script>
import ArrowRightIcon from 'vue-ionicons/dist/ios-arrow-forward.vue';

export default {
  components: {
    ArrowRightIcon,
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
.add-btn {
  display: inline;
  padding-top: 2px;
  padding-bottom: 2px;
}

.hidden {
  display: none;
}
</style>