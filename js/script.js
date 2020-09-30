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
    //console.log(user);
    if (user) {
        if (window.location.pathname == "/IoT/index.html" || window.location.pathname == "/index.html" || window.location.pathname == "/IoT/" || window.location.pathname == "/" ) {
            if (user.email == "admin@gmail.com") {
                window.location = "html/adminPanel.html";
            } else {
                window.location = "html/afterloginhomepage.html";
            }

        } else if (window.location.pathname == "/IoT/html/signup.html" || window.location.pathname == "/IoT/html/product-detail.html" ||
            window.location.pathname == "/IoT/html/loginformuser.html" || window.location.pathname == "/IoT/html/contact.html" ||
            window.location.pathname == "/html/signup.html" || window.location.pathname == "/html/product-detail.html" ||
            window.location.pathname == "/html/loginformuser.html" || window.location.pathname == "/html/contact.html") {
            if (user.email == "admin@gmail.com") {
                window.location = "adminPanel.html";
            } else {
                window.location = "afterloginhomepage.html";
            }
        }

    }

});

function loginUser(e) {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (email != "admin@gmail.com") {
        auth.signInWithEmailAndPassword(email, password).then(function (e) {
            window.location = "afterloginhomepage.html";
        }).catch(function (error) {
            var errorMessage = error.message;
            alert(errorMessage);
        });
    } else {
        alert("You are not a admin. Please Login as a user");
    }
}

function createUser(e) {
    e.preventDefault();
    var email = document.getElementById("userEmail").value;
    var password = document.getElementById("userPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // console.log(password);
    // console.log(confirmPassword);
    //validate that both passwords are same
    if (password == confirmPassword) {
        auth.createUserWithEmailAndPassword(email, password).then(
            function () {
                alert("Successfully create the account");
                //console.log("success");
                window.location = "loginformuser.html"
            }).catch(function (error) {
            //this function handles errors
            var errorCode = error.code;
            console.log(errorCode);
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(errorMessage);
        });
    } else {
        //alert when password did not matches
        alert("password does not matches");
    }
}

function loginAdmin(e) {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email == "admin@gmail.com") {
        auth.signInWithEmailAndPassword(email, password).then(function (e) {
            window.location = "adminPanel.html";
        }).catch(function (error) {
            var errorMessage = error.message;
            alert(errorMessage);
        });
    } else {
        alert("You are not a admin. Please Login as a user");
    }
}