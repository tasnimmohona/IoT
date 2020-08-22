var firebaseConfig = {
    apiKey: "AIzaSyC-S3geLS5FIi7GneyNNP-MzZcaQwnO3Lk",
    authDomain: "low-cast-iot-home-automation.firebaseapp.com",
    databaseURL: "https://low-cast-iot-home-automation.firebaseio.com",
    projectId: "low-cast-iot-home-automation",
    storageBucket: "low-cast-iot-home-automation.appspot.com",
    messagingSenderId: "297236782859",
    appId: "1:297236782859:web:68360425ce878ef5cc8c0e",
    measurementId: "G-L25F9RMWC1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var Firebase = firebase.database();
var auth = firebase.auth();

var u_name=document.getElementById("user-name");

//listen for auth status changed
auth.onAuthStateChanged(user => {
    console.log(user);
    if (user) {
        Firebase.ref('Flats').on('value', function (snapshot) {
            var pass = snapshot.val().filter(v => v.email === user.email);
            console.log(pass);
            let name = pass[0].personal_details.name;
            console.log(name);
            u_name.innerHTML = name;          
        });
    }
});


