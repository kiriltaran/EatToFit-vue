<template>
  <div class="products-list">
    <el-table :data="products" height="415" class="table" empty-text="Зарегистрируйтесь для продолжения работы">
      <el-table-column prop="title" label="Продукт" label-class-name="label-product"></el-table-column>
      <el-table-column prop="cal" label="Калории" label-class-name="label-cal"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <i class="add-icon ion-ios-arrow-forward" :class="{ hidden: products[scope.$index].inMenu }" @click="toggleInMenu(scope.row.id)"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="inputTitle" size="small" placeholder="Название продукта"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="inputCal" :min="1" size="small"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" plain @click="createProduct">Добавить</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputTitle: '',
      inputCal: '',
    };
  },
  methods: {
    createProduct() {
      if (this.inputTitle && this.inputCal) {
        const product = {
          title: this.inputTitle,
          cal: +this.inputCal,
        };
        this.$store.dispatch('createProduct', product);
        this.inputTitle = '';
        this.inputCal = '';
      }
    },
    toggleInMenu(productId) {
      this.$store.dispatch('toggleInMenu', productId);
    },
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
    loading() {
      return this.$store.getters.loading;
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

.el-table__body-wrapper {
  overflow-x: hidden;
}

.add-product-form {
  margin-top: 25px;
}
</style>