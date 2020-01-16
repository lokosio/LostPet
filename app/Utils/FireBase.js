import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyA25ueoIlXjA8Aoa28EBC9qYymppMtYFIw",
  authDomain: "lostpett-94fa2.firebaseapp.com",
  databaseURL: "https://lostpett-94fa2.firebaseio.com",
  projectId: "lostpett-94fa2",
  storageBucket: "lostpett-94fa2.appspot.com",
  messagingSenderId: "1075115191307",
  appId: "1:1075115191307:web:d184ae173e605e76446b0e"
};
  export const firebaseApp = firebase.initializeApp(firebaseConfig);