<template>
  <div class="menu">
    <el-table :data="menu" height="415" empty-text="Добавьте продукты в меню">
      <el-table-column prop="title" label="Продукт" label-class-name="label-title" width="180px"></el-table-column>
      <el-table-column label="Вес" label-class-name="label-weight" width="150px">
        <template slot-scope="scope">
          <el-input-number size="mini" :step="10" :value="scope.row.weight" @change="changeWeight($event, scope.row.id)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="Калории" label-class-name="label-cal">
        <template slot-scope="scope">
          {{Math.round(scope.row.weight / 100 * scope.row.cal)}}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="danger" round plain class="remove-btn" @click="removeFromMenu(scope.row.id)">
            <close-icon w="15px" h="15px"></close-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <menu-hint :menu-stats="menuStats" :BMR="BMR" class="menu-hint-container"></menu-hint>
  </div>
</template>

<script>
import CloseIcon from 'vue-ionicons/dist/ios-close.vue';

export default {
  name: 'products-menu',
  components: {
    CloseIcon,
    MenuHint: () => import('./MenuHint.vue'),
  },
  data() {
    return {};
  },
  methods: {
    removeFromMenu(productId) {
      this.$store.dispatch('toggleInMenu', productId);
    },
    changeWeight(weight, id) {
      this.$store.dispatch('changeWeight', {
        id,
        weight,
      });
    },
  },
  computed: {
    menu() {
      return this.$store.getters.menu;
    },
    menuStats() {
      const stats = {
        cal: 0,
        prot: 0,
        fat: 0,
        carbo: 0,
      };
      this.menu.forEach(product => {
        if (product.inMenu) {
          stats.cal += Math.round(product.weight / 100 * product.cal);
          stats.prot += Math.round(product.weight / 100 * product.prot);
          stats.fat += Math.round(product.weight / 100 * product.fat);
          stats.carbo += Math.round(product.weight / 100 * product.carbo);
        }
      });
      return stats;
    },
    BMR() {
      return this.$store.getters.user.BMR;
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-wrapper {
  text-align: right;
}

.remove-btn {
  display: inline;
  padding-top: 2px;
  padding-bottom: 2px;
}

.menu-hint-container {
  margin-top: 20px;
}
</style>