import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDExvhk5hA-A6y90KFpHPHR4cQrLKdi36s",
  authDomain: "lofihost-63550.firebaseapp.com",
  projectId: "lofihost-63550",
  storageBucket: "lofihost-63550.appspot.com",
  messagingSenderId: "768633149696",
  appId: "1:768633149696:web:41bfd6c59395460dcdfbe5",
  measurementId: "G-74K47B7WX4",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

firebase
  .database()
  .ref(".info/connected")
  .on("value", function (snapshot) {
    // If we're not currently connected, don't do anything.
    if (snapshot.val() === false) {
      return;
    }

    // If we are currently connected, then use the 'onDisconnect()'
    // method to add a set which will only trigger once this
    // client has disconnected by closing the app,
    // losing internet, or any other means.
    firebase
      .database()
      .ref()
      .onDisconnect()
      .update({ listeningNow: firebase.database.ServerValue.increment(-1) })
      .then(function () {
        // The promise returned from .onDisconnect().set() will
        // resolve as soon as the server acknowledges the onDisconnect()
        // request, NOT once we've actually disconnected:

        // We can now safely set ourselves as 'online' knowing that the
        // server will mark us as offline once we lose connection.
        firebase
          .database()
          .ref()
          .update({ listeningNow: firebase.database.ServerValue.increment(1) });
      });
  });

export { db, auth };
