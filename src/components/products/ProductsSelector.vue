<template>
  <div 
    v-loading="loading"
    class="products-select" 
  >
    <div 
      :class="centered ? 'centered' : ''"
      class="products-input-wrapper">
      <el-autocomplete 
        v-model="productsInput" 
        :fetch-suggestions="querySearch" 
        prefix-icon="el-icon-search" 
        value-key="title"
        placeholder="Введите название продукта" 
        class="products-input" 
        @select="selectProduct" 
      />
    </div>
    <div 
      v-if="selectedProduct"
      :class="!selectedProduct ? 'product-hidden' : ''"
      class="product">
      <div class="product-title">
        {{ selectedProduct.title }}
      </div>
      <div>
        <el-row 
          type="flex" 
          justify="space-around">
          <el-col :span="4">
            <img 
              v-if="selectedProduct.photo" 
              :src="selectedProduct.photo" 
              alt="product-photo" 
              class="product-photo">
            <img 
              v-else 
              src="../../assets/nophoto.png" 
              alt="product-photo" 
              class="product-photo">
          </el-col>
          <el-col :span="16">
            <el-table 
              :data="[selectedProduct]" 
              class="product-props">
              <el-table-column label="Тип">
                <template slot-scope="scope">
                  <el-tag>{{ scope.row.type }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column 
                prop="cal" 
                label="Калории(100г)"/>
              <el-table-column 
                prop="prot" 
                label="Белки(100г)"/>
              <el-table-column 
                prop="fat" 
                label="Жиры(100г)"/>
              <el-table-column 
                prop="carbo" 
                label="Углеводы(100г)"/>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <el-button 
        type="primary" 
        plain 
        class="add-btn"
        @click="addToMenu" 
      >Добавить в меню</el-button>
    </div>
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
      productPhoto: '',
      loading: false,
      centered: true,
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
    async selectProduct(product) {
      this.selectedProduct = product;
      this.productsInput = '';
      this.centered = false;
    },
    addToMenu() {
      this.$store.dispatch('toggleInMenu', this.selectedProduct.id);
      this.selectedProduct = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.centered {
  top: 50% !important;
  transform: translateY(50%);
  .products-input {
    transform: translateY(-50%);
  }
}

.products-select {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.products-input {
  text-align: center;
  width: 400px;
  &-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
    transition: top 0.3s linear;
  }
}

.product {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 100px;

  &-title {
    align-self: center;
    font-size: 32px;
  }
  &-props {
    animation: right-slide 0.33s linear;
  }
  &-photo {
    animation: left-slide 0.33s linear;
    border-radius: 50%;
    width: 206px;
    height: 206px;
    object-fit: fill;
  }
}

@keyframes left-slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes right-slide {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.prop {
  text-align: center;
}

.add-btn {
  width: 400px;
  align-self: center;
}
</style>