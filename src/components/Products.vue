<template>
  <el-row type="flex" justify="space-around">
    <el-col :span="13">
      <el-table :data="products" height="400" class="table">
        <el-table-column prop="title" label="Продукт" label-class-name="label-product"></el-table-column>
        <el-table-column prop="cal" label="Калории" label-class-name="label-cal"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <i class="add-icon ion-ios-plus-empty" v-bind:class="{ hidden: products[scope.$index].inMenu }" @click="inMenuToggle(scope.row.id)"></i>
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
    </el-col>
    <el-col :span="10">
      <el-table :data="menu" height="400" empty-text="Добавьте продукты в меню">
        <el-table-column prop="title" label="Продукт" label-class-name="label-product"></el-table-column>
        <el-table-column prop="cal" label="Калории" label-class-name="label-cal"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <i class="add-icon ion-ios-minus-empty" @click="inMenuToggle(scope.row.id)"></i>
          </template>
        </el-table-column>
      </el-table>
      <app-hint :menuCal="menuCal"></app-hint>
    </el-col>
  </el-row>
</template>

<script>
import bus from '../main';
import Hint from './Hint.vue';

export default {
  components: {
    'app-hint': Hint,
  },
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
    inMenuToggle(productId) {
      this.$store.dispatch('inMenuToggle', productId);
    },
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
    menu() {
      return this.$store.getters.menu;
    },
    menuCal() {
      let cal = 0;
      this.products.forEach(product => {
        if (product.inMenu) cal += product.cal;
      });
      return cal;
    },
  },
};
</script>

<style lang="scss">
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

.remove-icon {
  cursor: pointer;
  font-size: 25px;

  &:hover {
    color: red;
  }
}

.add-product-form {
  margin-top: 25px;
}
</style>