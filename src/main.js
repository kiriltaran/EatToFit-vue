import Vue from 'vue';
import * as firebase from 'firebase';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store';

import App from './App.vue';

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
    //   if (user) {
    //     this.$store.dispatch('autoSignIn', user);
    //   }
    // });
  },
});
