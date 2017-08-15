<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <h2>Список продуктов</h2>
        <div class="panel">
          <table class="table table-striped table-hover table-condensed">
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
                  <span class="kcal">{{product.kcal}}</span>
                </td>
                <td>
                  <i @click="inMenuToggle(product)" v-if="!product.inMenu" class="ion-ios-plus-empty add-icon"></i>
                </td>
              </tr>
            </tbody>
          </table>
          <form @submit.prevent="addProduct" class="add-product-form">
            <div class="form-group row">
              <div class="col-md-3">
                <input class="form-control input-sm" type="text" v-model="inputTitle" size="30" placeholder="Продукт" required>
              </div>
              <div class="col-md-2">
                <input class="form-control input-sm" type="number" v-model="inputKcal" size="30" placeholder="Калории" required>
              </div>
              <div class="col-md-2">
                <input class="btn btn-info btn-sm col-md-12" :class="{ disabled: !inputTitle || !inputKcal,}" type="submit" value="Добавить">
              </div>
            </div>
            <p class="help-block">Добавить свой продукт</p>
          </form>
        </div>
      </div>
      <div class="col-md-6">
        <h2>Ваше меню</h2>
        <div class="panel">
          <table class="table table-striped table-hover table-condensed">
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
                  <span class="kcal">{{product.kcal}}</span>
                </td>
                <td>
                  <i @click="inMenuToggle(product)" class="ion-ios-close-empty remove-icon"></i>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="row">
            <div class="col-md-offset-3">{{menuKcal}}</div>
          </div>
  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      inputTitle: null,
      inputKcal: null
    }
  },
  methods: {
    addProduct: function () {
      let lastProductID = this.products[this.products.length - 1].id;
      this.products.push({
        id: ++lastProductID,
        title: this.inputTitle,
        kcal: +this.inputKcal,
        inMenu: false
      })
      this.inputTitle = null;
      this.inputKcal = null;
    },
    inMenuToggle: function (product) {
      product.inMenu = !product.inMenu;
    }
  },
  computed: {
    menuKcal: function () {
      let kcal = 0;
      this.products.forEach(function (product) {
        if (product.inMenu) kcal += product.kcal;
      });
      return kcal;
    }
  },
  created: function () {
    this.$http.get('products.json')
      .then(function (response) {
        this.products = response.body;
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
</script>

<style lang="scss">
.main th {
  font-size: 30px;
}

.table tbody tr td {
  vertical-align: middle;
}

.add-icon {
  cursor: pointer;
  font-size: 25px;

  &:hover {
    color: green;
  }
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
