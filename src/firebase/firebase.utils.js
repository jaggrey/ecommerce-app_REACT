import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCqSTHyjWfO4Fk1l24EGtTGpAxIyFygWRQ",
  authDomain: "crwn-ecommerce-app-db.firebaseapp.com",
  databaseURL: "https://crwn-ecommerce-app-db.firebaseio.com",
  projectId: "crwn-ecommerce-app-db",
  storageBucket: "crwn-ecommerce-app-db.appspot.com",
  messagingSenderId: "1001707294534",
  appId: "1:1001707294534:web:383620e4d0f5c5b2825f47",
  measurementId: "G-G08R1Y3F0F",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exits) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

// Trigger sign-in popup
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
