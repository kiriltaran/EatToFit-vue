import axios from 'axios';

import * as firebase from 'firebase';

const api = {
  async signupUser(name, email, password) {
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
      user.updateProfile({
        displayName: name,
      });

      firebase
        .database()
        .ref(`users/${user.uid}`)
        .set({
          displayName: name,
        });

      return {
        id: user.uid,
        displayName: name,
        photoURL: null,
        BMR: null,
      };
    } catch (e) {
      throw e;
    }
  },
  async signinUser(email, password) {
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      const userStore = await this.getUserFromDB(user.uid);

      return {
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        gender: userStore.gender,
        height: userStore.height,
        weight: userStore.weight,
        age: userStore.age,
        activity: userStore.activity,
        goal: userStore.goal,
        BMR: userStore.BMR,
      };
    } catch (e) {
      throw e;
    }
  },
  async getUserFromDB(id) {
    try {
      const user = await firebase
        .database()
        .ref(`/users/${id}`)
        .once('value');

      return user.val();
    } catch (e) {
      throw e;
    }
  },
  async signInBySocials(providerName) {
    try {
      let provider;
      switch (providerName) {
        case 'github':
          provider = new firebase.auth.GithubAuthProvider();
          break;
        case 'twitter':
          provider = new firebase.auth.TwitterAuthProvider();
          break;
        default:
      }

      const { user } = await firebase.auth().signInWithPopup(provider);
      const userStore = await this.getUserFromDB(user.uid);

      return {
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        gender: userStore.gender,
        height: userStore.height,
        weight: userStore.weight,
        age: userStore.age,
        activity: userStore.activity,
        goal: userStore.goal,
        BMR: userStore.BMR,
      };
    } catch (e) {
      throw e;
    }
  },
  logout() {
    firebase.auth().signOut();
  },
  setUserData(id, data) {
    firebase
      .database()
      .ref()
      .update({
        [`/users/${id}/gender`]: data.gender,
        [`/users/${id}/height`]: data.height,
        [`/users/${id}/weight`]: data.weight,
        [`/users/${id}/age`]: data.age,
        [`/users/${id}/activity`]: data.activity,
        [`/users/${id}/goal`]: data.goal,
        [`/users/${id}/BMR`]: data.BMR,
      });
  },
  setDailyStats(id, stats) {
    const today = [new Date().getUTCDate(), new Date().getUTCMonth() + 1].join('-');
    firebase
      .database()
      .ref(`stats/${id}/${today}`)
      .update({
        BMR: stats.BMR,
        cal: stats.cal,
        prot: stats.prot,
        fat: stats.fat,
        carbo: stats.carbo,
      });
  },
  async fetchProducts() {
    try {
      const products = await firebase
        .database()
        .ref('products')
        .once('value');

      return products.val();
    } catch (e) {
      throw e;
    }
  },
  async createProduct(product) {
    try {
      const productStore = await firebase
        .database()
        .ref('products')
        .push(product);

      return productStore;
    } catch (e) {
      throw e;
    }
  },
  async getProductPhotos(title) {
    const images = [];
    try {
      const { data } = await axios.get(
        `https://api.gettyimages.com/v3/search/images?sort_order=best_match&phrase=${title}`,
        {
          headers: {
            'Api-Key': 'h9sn39rupyg5k6b3d3qqzhm4',
          },
        },
      );
      if (data.images.length) {
        const num = data.images.length <= 5 ? data.images.length - 1 : 4;
        for (let i = 0; i <= num; i += 1) {
          images.push(data.images[i].display_sizes[0].uri);
        }
      }
      return images;
    } catch (e) {
      throw e;
    }
  },
};

export default api;
