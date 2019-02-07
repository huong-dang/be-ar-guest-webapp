import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.messagingSenderId,
};

const fire = !firebase.apps.length
    ? firebase.initializeApp(config)
    : firebase.app();

export default fire;
