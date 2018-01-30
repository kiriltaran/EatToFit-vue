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
        BMR: userStore.BMR,
      };
    } catch (e) {
      throw e;
    }
  },
  logout() {
    firebase.auth().signOut();
  },
  setBMR(id, BMR) {
    firebase
      .database()
      .ref()
      .update({
        [`/users/${id}/BMR`]: BMR,
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
};

export default api;
