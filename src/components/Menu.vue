<template>
  <div class="menu">
      <el-table :data="menu" height="415" empty-text="Добавьте продукты в меню">
        <el-table-column prop="title" label="Продукт" label-class-name="label-product"></el-table-column>
        <el-table-column prop="cal" label="Калории" label-class-name="label-cal"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="icon-wrapper">
              <i class="remove-icon ion-android-close" @click="toggleInMenu(scope.row.id)"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <menu-hint :menu-cal="menuCal" :BMR="BMR" class="menu-hint-component"></menu-hint>
  </div>
</template>

<script>
import MenuHint from './MenuHint.vue';

import bus from '../main';

export default {
  components: {
    MenuHint,
  },
  data() {
    return {
      BMR: null,
    };
  },
  methods: {
    toggleInMenu(productId) {
      this.$store.dispatch('toggleInMenu', productId);
    },
  },
  computed: {
    menu() {
      return this.$store.getters.menu;
    },
    menuCal() {
      let cal = 0;
      this.menu.forEach(product => {
        if (product.inMenu) cal += product.cal;
      });
      return cal;
    },
  },
  created() {
    bus.$on('bmr-getted', data => {
      this.BMR = data;
    });
  },
};
</script>

<style lang="scss" scoped>
.icon-wrapper {
  text-align: right;
}
.remove-icon {
  margin-right: 15px;
  cursor: pointer;
  font-size: 25px;

  &:hover {
    color: red;
  }
}

.menu-hint-component {
  margin-top: 20px;
}
</style>