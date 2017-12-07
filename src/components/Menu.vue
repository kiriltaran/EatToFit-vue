<template>
  <div class="menu">
    <el-table :data="menu" height="415" empty-text="Добавьте продукты в меню">
      <el-table-column prop="title" label="Продукт" label-class-name="label-product"></el-table-column>
      <el-table-column prop="cal" label="Калории" label-class-name="label-cal"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <i class="remove-icon ion-android-close" @click="inMenuToggle(scope.row.id)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {
      inMenuToggle(productId) {
        this.$store.dispatch('inMenuToggle', productId);
      },
    },
    computed: {
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

<style lang="scss" scoped>
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
</style>