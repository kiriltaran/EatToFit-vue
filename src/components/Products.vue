<template>
  <div class="container-fluid">
    <el-row :gutter="20">
      <el-col :span="12">
        <h2>Список продуктов</h2>
        <el-table :data="products" height="400">
          <el-table-column prop="title" label="Продукт" label-class-name="label-product"></el-table-column>
          <el-table-column prop="cal" label="Калории" label-class-name="label-cal"></el-table-column>
          <el-table-column>
            <template scope="scope">
              <!-- <el-icon name="d-arrow-right" @click="inMenuToggle"></el-icon> -->
              <i class="add-icon ion-ios-plus-outline" v-bind:class="{ hidden: products[scope.$index].inMenu }" @click="inMenuToggle(scope.$index)"></i>
            </template>
          </el-table-column>
        </el-table>
        <!-- <table class="table table-striped table-hover table-condensed" style="display: none">
                                                                                                                              <tbody>
                                                                                                                                <tr>
                                                                                                                                  <th class="col-md-3">
                                                                                                                                    <i class="ion-ios-nutrition-outline" title="Продукт"></i>
                                                                                                                                  </th>
                                                                                                                                  <th class="col-md-6">
                                                                                                                                    <i class="ion-ios-calculator-outline" title="Калории"></i>
                                                                                                                                  </th>
                                                                                                                                  <th class="col-md-2">
                                                                                                                                    <i class="ion-ios-plus-outline" title="Добавить в меню"></i>
                                                                                                                                  </th>
                                                                                                                                </tr>
                                                                                                                                <tr v-for="product in products" :key="product.id">
                                                                                                                                  <td>
                                                                                                                                    <span>{{product.title}}</span>
                                                                                                                                  </td>
                                                                                                                                  <td>
                                                                                                                                    <span class="cal">{{product.cal}}</span>
                                                                                                                                  </td>
                                                                                                                                  <td>
                                                                                                                                    <i @click="inMenuToggle(product)" v-if="!product.inMenu" class="ion-ios-plus-empty add-icon"></i>
                                                                                                                                  </td>
                                                                                                                                </tr>
                                                                                                                              </tbody>
                                                                                                                            </table> -->
        <el-form :inline="true">
          <el-form-item>
            <el-input-number v-model="inputTitle" size="small"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-input-number v-model="inputCal" size="small"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="info" @click="getBMR">Добавить</el-button>
          </el-form-item>
        </el-form>
        <!-- <form @submit.prevent="addProduct" class="add-product-form">
                <div class="form-group row">
                  <div class="col-md-3">
                    <input class="form-control input-sm" type="text" v-model="inputTitle" size="30" placeholder="Продукт" required>
                  </div>
                  <div class="col-md-2">
                    <input class="form-control input-sm" type="number" v-model="inputCal" size="30" placeholder="Калории" required>
                  </div>
                  <div class="col-md-2">
                    <input class="btn btn-info btn-sm col-md-12" :class="{ disabled: !inputTitle || !inputCal}" type="submit" value="Добавить">
                  </div>
                </div>
                <p class="help-block">Добавить свой продукт</p>
              </form> -->
      </el-col>
      <el-col :span="12">
        <h2>Ваше меню</h2>
        <el-table :data="products" height="400">
          <el-table-column prop="title" label="Продукт" label-class-name="label-product"></el-table-column>
          <el-table-column prop="cal" label="Калории" label-class-name="label-cal"></el-table-column>
          <el-table-column>
            <template scope="scope">
              <!-- <el-icon name="d-arrow-right" @click="inMenuToggle"></el-icon> -->
              <i class="add-icon ion-ios-plus-outline" v-bind:class="{ hidden: products[scope.$index].inMenu }" @click="inMenuToggle(scope.$index)"></i>
            </template>
          </el-table-column>
        </el-table>
        <!-- <table class="table table-striped table-hover table-condensed">
                                                                                                                                          <tbody>
                                                                                                                                            <tr>
                                                                                                                                              <th class="col-md-3">
                                                                                                                                                <i class="ion-ios-nutrition-outline" title="Продукт"></i>
                                                                                                                                              </th>
                                                                                                                                              <th class="col-md-6">
                                                                                                                                                <i class="ion-ios-calculator-outline" title="Калории"></i>
                                                                                                                                              </th>
                                                                                                                                              <th class="col-md-2">
                                                                                                                                                <i class="ion-ios-close-outline" title="Добавить в меню"></i>
                                                                                                                                              </th>
                                                                                                                                            </tr>
                                                                                                                                            <tr v-for="product in products" v-if="product.inMenu" :key="product.id">
                                                                                                                                              <td>
                                                                                                                                                <span>{{product.title}}</span>
                                                                                                                                              </td>
                                                                                                                                              <td>
                                                                                                                                                <span class="cal">{{product.cal}}</span>
                                                                                                                                              </td>
                                                                                                                                              <td>
                                                                                                                                                <i @click="inMenuToggle(scope.$index)" class="ion-ios-close-empty remove-icon"></i>
                                                                                                                                              </td>
                                                                                                                                            </tr>
                                                                                                                                          </tbody>
                                                                                                                                        </table> -->
        <div class="row">
          <div class="col-md-offset-3">{{menuCal}}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { bus } from '../main'

export default {
  data() {
    return {
      products: [],
      inputTitle: null,
      inputCal: null
    }
  },
  methods: {
    addProduct: function() {
      let lastProductID = this.products[this.products.length - 1].id;
      this.products.push({
        id: ++lastProductID,
        title: this.inputTitle,
        cal: +this.inputCal,
        inMenu: false
      })
      this.inputTitle = null;
      this.inputCal = null;
    },
    inMenuToggle: function(productIndex) {
      console.log(this.products);
      this.products[productIndex].inMenu = !this.products[productIndex].inMenu;
    },
    getProducts: function() {
      this.$http.get('products.json')
        .then(function(response) {
          this.products = response.body;
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  },
  computed: {
    menuCal: function() {
      let cal = 0;
      this.products.forEach(function(product) {
        if (product.inMenu) cal += product.cal;
      });
      bus.$emit('menuCal-getted', cal);
      return cal;
    }
  },
  created: function() {
    this.getProducts();
  }
}
</script>

<style lang="scss">
.main th {
  font-size: 30px;
}

// .table tbody tr td {
//   vertical-align: middle;
// }
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
