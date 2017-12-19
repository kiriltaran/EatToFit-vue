import Vue from 'vue';
import firebase from 'firebase';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store';

import App from './App.vue';

Vue.use(VueResource);
Vue.use(ElementUI);

const bus = new Vue();

export default bus;

const config = {
  apiKey: 'AIzaSyDhfYDrdT05kjaQfaalejI_4MigeFA5_5o',
  authDomain: 'eattofit-24abf.firebaseapp.com',
  databaseURL: 'https://eattofit-24abf.firebaseio.com',
  projectId: 'eattofit-24abf',
  storageBucket: 'eattofit-24abf.appspot.com',
  messagingSenderId: '319047925289',
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  created() {
    firebase.initializeApp(config);
    // firebase.auth().onAuthStateChanged(user => {
    //   console.log('autologin user', user);
    //   if (user) {
    //     this.$store.dispatch('autoSignIn', user);
    //   }
    // });
  },
});
