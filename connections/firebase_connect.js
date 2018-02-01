var firebase = require('firebase');
// 貼上自己的 config 設定
var config = {
    apiKey: "AIzaSyDE1sYbvOHRHFi2W2U7M70aM10tffYtav8",
    authDomain: "authing-b3f07.firebaseapp.com",
    databaseURL: "https://authing-b3f07.firebaseio.com",
    projectId: "authing-b3f07",
    storageBucket: "authing-b3f07.appspot.com",
    messagingSenderId: "458961022390"
};

firebase.initializeApp(config);

module.exports = firebase;
