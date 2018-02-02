<template>
  <div class="products-select">
    <el-autocomplete v-model="productsInput" prefix-icon="el-icon-search" :fetch-suggestions="querySearch" value-key="title"
      placeholder="Введите название продукта" @select="selectProduct" class="products-input"></el-autocomplete>
    <div v-if="selectedProduct" class="product">
      <div class="product-title">
        {{selectedProduct.title}}
      </div>
      <div class="product-props">
        <el-row type="flex" justify="space-around">
          <el-col :span="3" class="prop">
            <div class="prop-name">Калории</div>
            <div class="prop-value">{{selectedProduct.cal}}</div>
          </el-col>
          <el-col :span="3" class="prop">
            <div class="prop-name">Белки</div>
            <div class="prop-value">{{selectedProduct.prot}}</div>
          </el-col>
          <el-col :span="3" class="prop">
            <div class="prop-name">Жиры</div>
            <div class="prop-value">{{selectedProduct.fat}}</div>
          </el-col>
          <el-col :span="3" class="prop">
            <div class="prop-name">Углеводы</div>
            <div class="prop-value">{{selectedProduct.carbo}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-button type="primary" plain @click="addToMenu" class="add-btn">Добавить в меню</el-button>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      productsInput: '',
      selectedProduct: null,
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
    selectProduct(product) {
      this.selectedProduct = product;
      this.productsInput = '';
    },
    addToMenu() {
      this.$store.dispatch('toggleInMenu', this.selectedProduct.id);
      this.selectedProduct = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.products-select {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.products-input {
  margin: 0 auto;
  width: 400px;
}

.product {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 60px;
  &-title {
    text-align: center;
    font-size: 32px;
    margin-bottom: 50px;
  }
  &-props {
    font-size: 24px;
  }
}

.prop {
  text-align: center;
}

.add-btn {
  width: 400px;
  margin: 0 auto;
}
</style>
