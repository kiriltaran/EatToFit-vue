import Vue from 'vue';
import * as firebase from 'firebase';
import {
  Collapse,
  CollapseItem,
  Dialog,
  Autocomplete,
  Menu,
  MenuItem,
  Input,
  InputNumber,
  Switch,
  Select,
  Option,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Alert,
  Row,
  Col,
  Card,
  Loading,
} from 'element-ui';
import lang from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';

import router from './router';
import store from './store';

import App from './App.vue';

require('vue-ionicons/ionicons.css');

locale.use(lang);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Alert);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Loading.directive);

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
  created() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });
  },
  render: h => h(App),
  router,
  store,
});
