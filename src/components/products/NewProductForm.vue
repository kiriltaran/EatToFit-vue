<template>
  <div class="new-product-form">
    <el-form :inline="true">
      <el-form-item>
        <el-input 
          v-model="title" 
          size="small" 
          placeholder="Название продукта"/>
      </el-form-item>
      <el-form-item>
        <el-input-number 
          v-model="cal" 
          :min="0" 
          size="small"/>
      </el-form-item>
      <el-form-item>
        <el-input-number 
          v-model="prot" 
          :min="0" 
          size="small"/>
      </el-form-item>
      <el-form-item>
        <el-input-number 
          v-model="fat" 
          :min="0" 
          size="small"/>
      </el-form-item>
      <el-form-item>
        <el-input-number 
          v-model="carbo" 
          :min="0" 
          size="small"/>
      </el-form-item>
      <el-form-item>
        <el-select 
          v-model="type" 
          clearable 
          size="small" 
          placeholder="Тип продукта">
          <el-option 
            v-for="type in types" 
            :key="type" 
            :label="type" 
            :value="type"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button 
          size="small" 
          type="primary" 
          plain 
          @click="openPhotoSelector">Добавить</el-button>
      </el-form-item>
    </el-form>
    <el-dialog 
      v-if="showPhotoSelector"
      :title="`Выберите подходящее фото для продукта '${title}'`" 
      :visible.sync="showPhotoSelector" 
      :show-close="false" 
      :close-on-click-modal="false">
      <products-photo-selector 
        :title="title" 
        @photo-selected="onPhotoSelected"/>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'NewProductForm',
  components: {
    ProductsPhotoSelector: () => import('./ProductPhotoSelector.vue'),
  },
  data() {
    return {
      title: '',
      cal: 1,
      prot: 1,
      fat: 1,
      carbo: 1,
      photo: '',
      type: '',
      showPhotoSelector: false,
      types: [
        'Первые блюда',
        'Блюда из овощей',
        'Зернобобовые, крупы, каши',
        'Овощи',
        'Фрукты',
        'Мясо',
        'Колбасы',
        'Рыба',
        'Грибы',
        'Орехи, семечки',
        'Яйца',
        'Молоко, молочные продукты',
        'Сыры',
        'Масло',
        'Растительное масло',
        'Напитки',
        'Мучные изделия',
        'Мука',
        'Сладости',
      ],
    };
  },
  methods: {
    openPhotoSelector() {
      if (this.title) {
        this.showPhotoSelector = true;
      }
    },
    onPhotoSelected(photo) {
      this.photo = photo;
      this.createProduct();
    },
    createProduct() {
      if (this.title) {
        const product = {
          title: this.title,
          cal: +this.cal,
          prot: +this.prot,
          fat: +this.fat,
          carbo: +this.carbo,
          photo: this.photo,
          type: this.type,
        };

        this.$store.dispatch('createProduct', product);
        this.showPhotoSelector = false;
        this.title = '';
        this.cal = 1;
        this.prot = 1;
        this.fat = 1;
        this.carbo = 1;
        this.photo = '';
        this.type = '';
      }
    },
  },
};
</script>