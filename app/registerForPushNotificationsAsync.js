import { Permissions, Notifications } from 'expo';
import * as firebase from 'firebase';



firebase.initializeApp({
  apiKey: "AIzaSyBq_hCS5Wxxe9CEGw_Wo6CXcfcNJ06wBOs",
  authDomain: "---",
  databaseURL: "https://hackyeach.firebaseio.com",
  projectId: "hackyeach",
  storageBucket: "gs://hackyeach.appspot.com",
  messagingSenderId: "944163924283"
});


export default (async function registerForPushNotificationsAsync() {
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);


//   // POST the token to our backend so we can use it to send pushes from there
//   return fetch('https://api/...', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       token: {
//         value: token,
//       },
//     }),
//   });
});