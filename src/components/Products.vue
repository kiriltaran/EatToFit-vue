<template>
  <div class="container-fluid">
    <el-row type="flex" justify="space-around">
      <el-col :span="12">
        <h2>Список продуктов</h2>
        <el-table :data="products" height="400">
          <el-table-column prop="title" label="Продукт" label-class-name="label-product"></el-table-column>
          <el-table-column prop="cal" label="Калории" label-class-name="label-cal"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <i class="add-icon ion-ios-plus-empty" v-bind:class="{ hidden: products[scope.$index].inMenu }" @click="inMenuToggle(scope.row.id)"></i>
            </template>
          </el-table-column>
        </el-table>
        </table>
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="inputTitle" size="small" placeholder="Название продукта"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input-number v-model="inputCal" size="small"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="info" @click="addProduct">Добавить</el-button>
          </el-form-item>
        </el-form>
        </form>
      </el-col>
      <el-col :span="11">
        <h2>Меню</h2>
        <el-table :data="menu" height="400">
          <el-table-column prop="title" label="Продукт" label-class-name="label-product"></el-table-column>
          <el-table-column prop="cal" label="Калории" label-class-name="label-cal"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <i class="add-icon ion-ios-minus-empty" @click="inMenuToggle(scope.row.id)"></i>
            </template>
          </el-table-column>
        </el-table>
        <app-hint :menu-cal="menuCal"></app-hint>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { bus } from "../main";
import Hint from "./Hint.vue";

export default {
  components: {
    "app-hint": Hint
  },
  data() {
    return {
      products: [],
      inputTitle: null,
      inputCal: null
    };
  },
  methods: {
    addProduct: function() {
      if (this.inputTitle && this.inputCal) {
        let lastProductID = this.products[this.products.length - 1].id;
        this.products.push({
          id: ++lastProductID,
          title: this.inputTitle,
          cal: +this.inputCal,
          inMenu: false
        });
        this.inputTitle = null;
        this.inputCal = null;
      }
    },
    inMenuToggle: function(productId) {
      this.products[productId].inMenu = !this.products[productId].inMenu;
    },
    getProducts: function() {
      this.$http
        .get("products.json")
        .then(function(response) {
          this.products = response.body;
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  },
  computed: {
    menu: function() {
      let menu = this.products.filter(function(product) {
        return product.inMenu === true;
      });
      return menu;
    },
    menuCal: function() {
      let cal = 0;
      this.products.forEach(function(product) {
        if (product.inMenu) cal += product.cal;
      });
      bus.$emit("menuCal-getted", cal);
      return cal;
    }
  },
  created: function() {
    this.getProducts();
  }
};
</script>

<style lang="scss">
.main th {
  font-size: 30px;
}

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
