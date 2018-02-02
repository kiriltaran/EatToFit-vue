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
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="newProduct.title" size="small" placeholder="Название продукта"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="newProduct.cal" :min="1" size="small"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="newProduct.prot" :min="1" size="small"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="newProduct.fat" :min="1" size="small"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="newProduct.carbo" :min="1" size="small"></el-input-number>
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
      newProduct: {
        title: '',
        cal: '',
        prot: '',
        fat: '',
        carbo: '',
      },
    };
  },
  methods: {
    createProduct() {
      if (
        this.newProduct.title &&
        this.newProduct.cal &&
        this.newProduct.prot &&
        this.newProduct.fat &&
        this.newProduct.carbo
      ) {
        const product = {
          title: this.newProduct.title,
          cal: +this.newProduct.cal,
          prot: +this.newProduct.prot,
          fat: +this.newProduct.fat,
          carbo: +this.newProduct.carbo,
        };
        this.$store.dispatch('createProduct', product);
        this.newProduct.title = '';
        this.newProduct.cal = '';
        this.newProduct.prot = '';
        this.newProduct.fat = '';
        this.newProduct.carbo = '';
      }
    },
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

.add-product-form {
  margin-top: 25px;
}
</style>
