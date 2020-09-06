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
                document.getElementById("fan").innerHTML = user_details[0].switch.fan;
                document.getElementById("pump").innerHTML = user_details[0].switch.pump;
                document.getElementById("temperature").innerHTML = user_details[0].temperature + " °C";
                document.getElementById("Humidity").innerHTML = user_details[0].humidity+" %";
                if(user_details[0].smoke == "1"){
                    document.getElementById("Smoke").innerHTML = "Detected";
                }
                else{
                    document.getElementById("Smoke").innerHTML = "Not Detected";
                }

                if(user_details[0].gas == "1"){
                    document.getElementById("Gas").innerHTML = "Detected";
                }
                else{
                    document.getElementById("Gas").innerHTML = "Not Detected";
                }
               
                if(user_details[0].flam == "1"){
                    document.getElementById("Flame").innerHTML = "Detected";
                }
                else{
                    document.getElementById("Flame").innerHTML = "Not Detected";
                }
                
                if(user_details[0].switch.whiteled=="off")
                {
                    document.querySelector(".room-box1").style.backgroundColor = "red";
                }
                if(user_details[0].switch.whiteled=="on")
                {
                    document.querySelector(".room-box1").style.backgroundColor = "green";
                }
                if(user_details[0].switch.fan=="off")
                {
                    document.querySelector(".room-box2").style.backgroundColor = "red";
                }
                if(user_details[0].switch.fan=="on")
                {
                    document.querySelector(".room-box2").style.backgroundColor = "green";
                }
                if(user_details[0].switch.pump=="off")
                {
                    document.querySelector(".room-box3").style.backgroundColor = "red";
                }
                if(user_details[0].switch.pump=="on")
                {
                    document.querySelector(".room-box3").style.backgroundColor = "green";
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
        var value = user_details[0].switch.whiteled;
        if (value == "on") {
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

function fanControl(e) {
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
        var value = user_details[0].switch.fan;
        if (value == "on") {
            data = {
                fan: "off"
            }
        } else {
            data = {
                fan: "on"
            }
        }
        Firebase.ref('/Flats/').child(i).child('/switch/').update(data);
    });

}

function pumpControl(e) {
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
        var value = user_details[0].switch.pump;
        if (value == "on") {
            data = {
                pump: "off"
            }
        } else {
            data = {
                pump: "on"
            }
        }
        Firebase.ref('/Flats/').child(i).child('/switch/').update(data);
    });

}
