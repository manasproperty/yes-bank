
import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4ALuYG1vZisqBYQSytMJzF_kMl_roMyU",
  authDomain: "pakocean.firebaseapp.com",
  databaseURL: "https://pakocean-default-rtdb.firebaseio.com",
  projectId: "pakocean",
  storageBucket: "pakocean.firebasestorage.app",
  messagingSenderId: "429728112687",
  appId: "1:429728112687:web:d556868a1eb878f9e4e6da",
  measurementId: "G-DP6HLEN1BJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
    }),
});


export { db };
