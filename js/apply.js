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

var u_name = document.getElementById("user-name");

//listen for auth status changed
auth.onAuthStateChanged(user => {
    //console.log(user);
    if (user) {
        u_name.innerHTML = user.email;
        Firebase.ref('Flats').on('value', function (snapshot) {
            var user_details = snapshot.val().filter(v => v.email === user.email);
            if (user_details.length != 0) {
                window.location = "afterloginhomepage.html";
            }
        });
        Firebase.ref('application/' + user.uid).on('value', function (snapshot) {
            var id = snapshot.val();
            if (id != null) {
                //console.log(id)
                document.getElementById("apply_btn").style.display = "initial";
                document.querySelector("#contact-right #pending_text p").style.display = "initial";
                document.querySelector("#req_form").style.display = "none";
            } else {
                document.getElementById("apply_btn").style.display = "initial";
                var email = document.getElementById("emailreq");
                email.value = user.email;
                document.querySelector("#contact-right #pending_text p").style.display = "none";
                document.querySelector("#req_form").style.display = "initial";
            }
        });

    }
});

function logout() {
    auth.signOut();
}

var submit=document.querySelector("#reqsubmit");
submit.addEventListener('click',(e)=>{ 
    //console.log("Call the function")
    e.preventDefault();
    var name = document.getElementById("namereq").value;
    var email = document.getElementById("emailreq").value;
    var phone = document.getElementById("contactreq").value;
    var age = document.getElementById("agereq").value;
    var nid = document.getElementById("nidreq").value;
    var address = document.getElementById("addreq").value;

    auth.onAuthStateChanged(user => {
       // console.log(user.uid);
        Firebase.ref('application/' + user.uid).set({
            name: name,
            email: email,
            Phone_number: phone,
            age: age,
            nid_no: nid,
            permanent_address: address
        });
    });
});