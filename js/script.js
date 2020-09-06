// Your web app's Firebase configuration
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

//listen for auth status changed
auth.onAuthStateChanged(user => {
    console.log(user);
    if (user) {
        if (window.location.pathname == "/index.html") {
            window.location = "html/afterloginhomepage.html";
        } else if (window.location.pathname == "/html/signup.html" || window.location.pathname == "/html/product-detail.html" ||
            window.location.pathname == "/html/loginformuser.html" || window.location.pathname == "/html/contact.html") {                
            window.location = "afterloginhomepage.html";
        } else {

        }

    }

});

function loginUser(e) {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password).then(function (e) {
        window.location = "afterloginhomepage.html";
    }).catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
    });
}