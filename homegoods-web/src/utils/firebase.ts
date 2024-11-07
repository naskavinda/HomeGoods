import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB-xOlxj1BX4z1y-omLhUgKTmBa8wCQH2s",
  authDomain: "homegoods-3e8e4.firebaseapp.com",
  projectId: "homegoods-3e8e4",
  storageBucket: "homegoods-3e8e4.firebasestorage.app",
  messagingSenderId: "238375396049",
  appId: "1:238375396049:web:953cf59b62572c384a9bf0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.useDeviceLanguage();
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
