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
                document.getElementById("rfidcard-number").innerHTML = user_details[0].rfid;
                document.getElementById("light").innerHTML = user_details[0].switch.whiteled;
                if(user_details[0].switch.whiteled=="off")
                {
                    document.querySelector(".room-box1").style.backgroundColor = "red";
                }
                if(user_details[0].switch.whiteled=="on")
                {
                    document.querySelector(".room-box1").style.backgroundColor = "green";
                }

            } else {
                console.log(user_details);
                alert("You Dont have any Room,Yet..")
                window.location = "afterloginhomepage.html";
            }


        });
    }
});

function logout() {
    auth.signOut();
}

function ligtControl(e) {
    e.preventDefault();
    auth.onAuthStateChanged(user => {
        var i;
        var data;
        var user_details;
        Firebase.ref('Flats').on('value', function (snapshot) {
            var s = snapshot.val();
            user_details = s.filter(v => v.email === user.email);
            for (i = 0; i < s.length; i++) {
                if (s[i] != null) {
                    if (s[i].email == user.email) {
                        ind = i;
                        break;
                    }
                }
            }
        });
        var fan_value = user_details[0].switch.whiteled;
        if (fan_value == "on") {
            data = {
                whiteled: "off"
            }
        } else {
            data = {
                whiteled: "on"
            }
        }
        Firebase.ref('/Flats/').child(i).child('/switch/').update(data);
    });

}