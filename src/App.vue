<template>
  <div id="app">
  
    <app-header></app-header>
    <main class="main">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <h2>Продукты</h2>
            <div class="panel">
              <table class="table table-striped table-hover table-condensed">
                <tbody>
                  <tr>
                    <th class="col-md-3">
                      <span class="glyphicon glyphicon-apple" aria-hidden="true"></span>
                    </th>
                    <th class="col-md-6">
                      <span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span>
                    </th>
                    <th class="col-md-2">
                      <span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>
                    </th>
                  </tr>
                  <tr v-for="product in products">
                    <td>
                      <span>{{product.title}}</span>
                    </td>
                    <td>
                      <span class="kcal">{{product.kcal}}</span>
                    </td>
                    <td>
                      <button @click="inMenuToggle(product)" class="btn btn-info btn-xs" v-if="!product.inMenu">
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                      </button>
                      <!-- <input ng-click="addToMenu()" ng-show="!product.inMenu" class="btn btn-info" type="button" value="+"> -->
                    </td>
                  </tr>
                </tbody>
              </table>
              <form @submit.prevent="addProduct">
                <div class="form-group row">
                  <div class="col-md-3">
                    <input class="form-control input-sm" type="text" v-model="inputTitle" size="30" placeholder="Продукт" required>
                  </div>
  
                  <div class="col-md-2">
                    <input class="form-control input-sm" type="number" v-model="inputKcal" size="30" placeholder="Калории" required>
                  </div>
                  <input class="btn btn-info btn-sm col-md-1" v-bind:class="{ disabled: !inputTitle || !inputKcal,}" type="submit" value="Добавить">
                </div>
              </form>
            </div>
          </div>
          <div class="col-md-6">
            <h2>Меню</h2>
            <div class="panel">
              <table class="table table-striped table-hover table-condensed">
                <tbody>
                  <tr>
                    <th>
                      <span class="glyphicon glyphicon-apple" aria-hidden="true"></span>
                    </th>
                    <th>
                      <span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span>
                    </th>
                    <th>
                      <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
                    </th>
                  </tr>
                  <tr v-for="product in products" v-if="product.inMenu">
                    <td>
                      <span>{{product.title}}</span>
                    </td>
                    <td>
                      <span class="kcal">{{product.kcal}}</span>
                    </td>
                    <td>
                      <button @click="inMenuToggle(product)" class="btn btn-danger btn-xs">
                        <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>
                      </button>
                      <!-- <input ng-click="addToMenu()" ng-show="!product.inMenu" class="btn btn-info" type="button" value="+"> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
    <app-footer></app-footer>
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
      this.products.push({
        title: this.inputTitle,
        kcal: this.inputKcal,
        inMenu: false
      })
      this.inputTitle = null;
      this.inputKcal = null;
    },
    inMenuToggle: function (product) {
      product.inMenu = !product.inMenu;
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
html {
  position: relative;
  min-height: 100%;
}

body {
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}

.main th {
  font-size: 30px;
}

.title {
  width: 50px;
}
</style>
