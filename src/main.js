import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App.vue'
import Header from './Header.vue'
import Main from './Main.vue'
import Footer from './Footer.vue'

Vue.use(VueResource)

Vue.component('app-header', Header);
Vue.component('app-main', Main);
Vue.component('app-footer', Footer);

new Vue({
  el: '#app',
  render: h => h(App)
})