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

    Firebase.ref('parking/1').on('value', function (snapshot) {
        var p=snapshot.val();
        const value = Object.entries(p);
        //console.log(value);
        value.forEach(v => {
            //console.log(v[0], v[1]);
            const id = v[0].slice(-1);
            document.querySelector("#compartment_"+id).innerHTML=v[1];
        });
    });
   
    //console.log(user);
    if (user) {
        u_name.innerHTML = user.email ;
    }
});

function logout() {
    auth.signOut();
}