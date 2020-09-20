import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

// const config = {
//     apiKey: 'AIzaSyDwZ41RWIytGELNBnVpDr7Y_k1ox2F2Heg',
//     authDomain: 'townhallproject-86312.firebaseapp.com',
//     databaseURL: 'https://townhallproject-86312.firebaseio.com',
//     storageBucket: 'townhallproject-86312.appspot.com',
//     messagingSenderId: '208752196071',
//     projectId: 'townhallproject-86312',
// };

const config = {
    apiKey: 'AIzaSyCJncx2G6bUnecl4H2VHSBTDfRRxg7H5Fs',
    authDomain: 'townhalltestingsms.firebaseapp.com',
    databaseURL: 'https://townhalltestingsms.firebaseio.com',
    storageBucket: 'townhalltestingsms.appspot.com',
    messagingSenderId: '86976100332',
    projectId: 'townhalltestingsms',
};

firebase.initializeApp(config);
const firestore = firebase.firestore();
const firebasedb = firebase.database();

export {
    firebase,
    firebasedb,
    firestore
};