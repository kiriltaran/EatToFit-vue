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
        bmr: null,
      };
    } catch (e) {
      throw e;
    }
  },
  async signinUser(email, password) {
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      let userStore = await this.getUserData(user.uid);

      if (!userStore) {
        userStore = {
          gender: '',
          height: 1,
          weight: 1,
          age: 1,
          activity: '',
          goal: '',
          bmr: null,
        };
      }

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
        bmr: userStore.bmr,
      };
    } catch (e) {
      throw e;
    }
  },
  async getUserData(id) {
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
        case 'facebook':
          provider = new firebase.auth.FacebookAuthProvider();
          break;
        default:
      }

      const { user } = await firebase.auth().signInWithPopup(provider);
      let userStore = await this.getUserData(user.uid);

      if (!userStore) {
        userStore = {
          gender: '',
          height: 1,
          weight: 1,
          age: 1,
          activity: '',
          goal: '',
          bmr: null,
        };
      }

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
        bmr: userStore.bmr,
      };
    } catch (e) {
      throw e;
    }
  },
  logout() {
    firebase.auth().signOut();
  },
  async setUserData(id, data) {
    try {
      await firebase
        .database()
        .ref()
        .update({
          [`/users/${id}/gender`]: data.gender,
          [`/users/${id}/height`]: data.height,
          [`/users/${id}/weight`]: data.weight,
          [`/users/${id}/age`]: data.age,
          [`/users/${id}/activity`]: data.activity,
          [`/users/${id}/goal`]: data.goal,
          [`/users/${id}/bmr`]: data.bmr,
        });
    } catch (e) {
      window.console.log(e);
    }
  },
  async setDailyStats(id, stats, date) {
    try {
      const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const timestamp = startOfDay.getTime();

      await firebase
        .database()
        .ref(`stats/${id}/${timestamp}`)
        .set({
          bmr: stats.bmr,
          cal: stats.cal,
          prot: stats.prot,
          fat: stats.fat,
          carbo: stats.carbo,
        });
    } catch (e) {
      window.console.log(e);
    }
  },
  async fetchUserStats(id) {
    try {
      const userStats = await firebase
        .database()
        .ref(`/stats/${id}`)
        .once('value');

      return userStats.val();
    } catch (e) {
      throw e;
    }
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
    try {
      const images = [];
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
