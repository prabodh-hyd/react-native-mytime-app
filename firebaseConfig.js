import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyCRTWwyFfVK8phS2vANDWBvJP8vqITu0Js",
    authDomain: "prabodhtechnologies-webapp.firebaseapp.com",
    databaseURL: "https://prabodhtechnologies-webapp.firebaseio.com",
    projectId: "prabodhtechnologies-webapp",
    storageBucket: "prabodhtechnologies-webapp.appspot.com",
    messagingSenderId: "123398771273",
    appId: "1:123398771273:web:b759fbaa34800b09d42598",
    measurementId: "G-QREW3LEBVG"
  };

  const app = initializeApp(firebaseConfig);

  // const auth = initializeAuth(app, {
  //   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  // });
  const auth = getAuth(app);
  export { app, auth };