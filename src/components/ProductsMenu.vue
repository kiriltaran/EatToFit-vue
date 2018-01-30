<template>
  <div class="menu">
    <el-table :data="menu" height="415" empty-text="Добавьте продукты в меню">
      <el-table-column prop="title" label="Продукт" label-class-name="label-title" width="180px"></el-table-column>
      <el-table-column label="Вес" label-class-name="label-weight" width="150px">
        <template slot-scope="scope">
            <el-input-number size="mini" :value="scope.row.weight" @change="changeWeight($event, scope.row.id)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="Калории" label-class-name="label-cal">
        <template slot-scope="scope">
            {{Math.round(scope.row.weight / 100 * scope.row.cal)}}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
            <i class="remove-icon ion-android-close" @click="removeFromMenu(scope.row.id)"></i>
        </template>
      </el-table-column>
    </el-table>
    <menu-hint :menu-cal="menuCal" :BMR="BMR" class="menu-hint-component"></menu-hint>
  </div>
</template>

<script>
import MenuHint from './MenuHint.vue';

export default {
  components: {
    MenuHint,
  },
  data() {
    return {};
  },
  methods: {
    removeFromMenu(productId) {
      this.$store.dispatch('toggleInMenu', productId);
    },
    changeWeight(weight, id) {
      console.log(weight, id);
      this.$store.dispatch('changeWeight', { id, weight });
    },
  },
  computed: {
    menu() {
      return this.$store.getters.menu;
    },
    menuCal() {
      let cal = 0;
      console.log(this.menu);
      this.menu.forEach(product => {
        if (product.inMenu) {
          cal += product.weight / 100 * product.cal;
        }
      });
      return Math.round(cal);
    },
    BMR() {
      return this.$store.getters.BMR;
    },
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
