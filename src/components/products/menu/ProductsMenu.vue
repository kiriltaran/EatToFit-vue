<template>
  <div class="menu">
    <el-table 
      :data="menu" 
      height="390" 
      empty-text="Добавьте продукты в меню">
      <el-table-column 
        prop="title" 
        label="Продукт" 
        label-class-name="label-title" 
        width="180px"/>
      <el-table-column 
        label="Вес" 
        label-class-name="label-weight" 
        width="150px">
        <template slot-scope="scope">
          <el-input-number 
            :step="10" 
            :value="scope.row.weight" 
            size="mini" 
            @change="changeWeight($event, scope.row.id)"/>
        </template>
      </el-table-column>
      <el-table-column 
        label="Калории" 
        label-class-name="label-cal">
        <template slot-scope="scope">
          {{ Math.round(scope.row.weight / 100 * scope.row.cal) }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button 
            type="danger" 
            round 
            plain 
            class="remove-btn" 
            @click="removeFromMenu(scope.row.id)">
            <close-icon 
              w="15px" 
              h="15px"/>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="save">
      <div class="save-calendar save-action">
        <el-date-picker
          v-model="date"
          :picker-options="datePickerOptions"
          format="dd-MM-yyyy"
          type="date"
          size="small"
          placeholder="Выберите дату"
        />
      </div>
      <div class="save-btn save-action">
        <el-button
          :disabled="isDisabledRememberButton" 
          type="primary" 
          class="hint-btn"
          plain 
          size="small"
          @click="rememberDailyStats" 
        >Записать</el-button>
      </div>
    </div>
    <menu-hint 
      :menu-stats="menuStats" 
      :bmr="bmr" 
      class="menu-hint-container"/>
  </div>
</template>

<script>
import CloseIcon from 'vue-ionicons/dist/ios-close.vue';
import MenuHint from './MenuHint.vue';

export default {
  name: 'ProductsMenu',
  components: {
    CloseIcon,
    MenuHint,
  },
  data() {
    return {
      date: '',
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: 'Сегодня',
            onClick(picker) {
              picker.$emit('pick', new Date());
            },
          },
          {
            text: 'Вчера',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            },
          },
        ],
      },
    };
  },
  computed: {
    isDisabledRememberButton() {
      return !(this.menu.length && this.date);
    },
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
    bmr() {
      return this.$store.getters.user ? this.$store.getters.user.bmr : 0;
    },
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
    rememberDailyStats() {
      try {
        this.$store.dispatch('setDailyStats', {
          date: this.date,
          stats: {
            bmr: this.bmr,
            cal: this.menuStats.cal,
            prot: this.menuStats.prot,
            fat: this.menuStats.fat,
            carbo: this.menuStats.carbo,
          },
        });
        this.$message({
          message: 'Сегодняшнее меню сохранено',
          type: 'success',
        });
      } catch (e) {
        window.console.log(e);
      }
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
  margin-top: 10px;
}

.save {
  padding-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  &-action {
    width: 45%;
  }
  .save-calendar .el-date-editor,
  .save-btn button {
    width: 100%;
  }
}
</style>