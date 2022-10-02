import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAHd99Ud80-AACb222vVMY-aWANkjky1aY',
  authDomain: 'project-group-5-3fbb9.firebaseapp.com',
  projectId: 'project-group-5-3fbb9',
  storageBucket: 'project-group-5-3fbb9.appspot.com',
  messagingSenderId: '618619648177',
  appId: '1:618619648177:web:8a1b14c746b874718c4a90',
};

const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');

class AuthenticationService {
  currentUser;

  constructor() {
    this.app = initializeApp(FIREBASE_CONFIG);
    this.provider = new GoogleAuthProvider();
    this.auth = getAuth();

    onAuthStateChanged(this.auth, user => {
      this.currentUser = user ? user : null;
      if (user) {
        btnLogin.style.display = 'none';
        btnLogout.style.display = 'block';
      } else {
        btnLogin.style.display = 'block';
        btnLogout.style.display = 'none';
      }
    });
  }

  authenticateUser() {
    return signInWithPopup(this.auth, this.provider)
      .then(result => {
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
  }

  deAuthenticateUser() {
    return signOut(this.auth)
      .then(() => {
        console.log('Signed out successfully');
      })
      .catch(error => {
        console.log('Sign out failed');
      });
  }

  get currentUser() {
    return this.currentUser;
  }

  set currentUser(user) {
    this.currentUser = user;
  }
}

window.authenticationService = new AuthenticationService();

if (btnLogin) {
  btnLogin.addEventListener('click', async event => {
    event.preventDefault();
    await window.authenticationService.authenticateUser();
  });
}

if (btnLogout) {
  btnLogout.addEventListener('click', async event => {
    event.preventDefault();
    await window.authenticationService.deAuthenticateUser();
  });
}
