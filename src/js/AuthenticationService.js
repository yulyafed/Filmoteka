import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAHd99Ud80-AACb222vVMY-aWANkjky1aY',
  authDomain: 'project-group-5-3fbb9.firebaseapp.com',
  projectId: 'project-group-5-3fbb9',
  storageBucket: 'project-group-5-3fbb9.appspot.com',
  messagingSenderId: '618619648177',
  appId: '1:618619648177:web:8a1b14c746b874718c4a90',
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');

onAuthStateChanged(auth, user => {
  if (user) {
    const uid = user.uid;
    toggleVisibility(btnLogin, false);
    toggleVisibility(btnLogout, true);
  } else {
    console.log('User not authenticated', user);
    toggleVisibility(btnLogin, true);
    toggleVisibility(btnLogout, false);
  }
});

if (btnLogin) {
  btnLogin.addEventListener('click', event => {
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then(result => {
        //auth.updateCurrentUser(result.user);

        console.log(credential, token, user);
      })
      .catch(error => {
        // TODO
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  });
}

if (btnLogout) {
  btnLogout.addEventListener('click', event => {
    event.preventDefault();
    signOut(auth)
      .then(() => {
        console.log('Signed out successfully');
      })
      .catch(error => {
        console.log('Sign out failed');
      });
  });
}

const toggleVisibility = (element, visible) => {
  element.style = visible ? 'display: block' : 'display: none';
};
