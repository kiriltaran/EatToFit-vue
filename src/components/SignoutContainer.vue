<template>
  <div class="signout-container">
    <div class="bg-opacity"/>
    <el-row>
      <el-col
        :span="20"
        :offset="1"
      >
        <el-row 
          type="flex" 
          justify="center">
          <el-col>
            <div class="features">
              <div class="features-text">Поможет достичь поставленной цели, автоматизирует контроль, предоставит подробную статистику</div>
              <el-button 
                type="primary" 
                class="signup-btn"
                @click="openAuth">
                Зарегистрироваться
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row 
          type="flex" 
          justify="center">
          <el-col
            :span="8" 
            :offset="4">
            <el-card class="quote">"Eat your greens to fit into your jeans"</el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="8" 
            :offset="3">
            <el-card class="quote">"Ты – то, что ты ешь"</el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    openAuth() {
      this.$emit('open-auth');
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-opacity {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  opacity: 0.5;
}
.signout-container {
  display: flex;
  align-items: center;
  transform: translateY(-25px);
  background: url('../assets/bg.jpg') no-repeat;
  background-size: 100%;
  height: 100vh;
}

.signup-btn {
  font-size: 26px;
}

.features {
  text-align: center;
  margin-bottom: 150px;
  &-text {
    font-size: 28px;
    margin-bottom: 100px;
  }
}

.quote {
  margin-bottom: 20px;
}
</style>


