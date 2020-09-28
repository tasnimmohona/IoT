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

var bgOverlay = document.getElementsByClassName('bg-overlay')[0];
var popUp = document.getElementsByClassName('popup-content')[0];

const closePopup = () => {
    bgOverlay.style.display = "none";
}
let key1 ;
const checkPopup = (key) => {
    key1=key;
    bgOverlay.style.display = "block";
    let re=document.querySelector("#submit_btn");
    console.log(key1)
    Firebase.ref('application/' + key).on('value', function (snapshot) {
        var app = snapshot.val();
        document.querySelector("#name").value = app.name;
        document.querySelector("#email").value = app.email;
        document.querySelector("#phone_number").value = app.Phone_number;
        document.querySelector("#age").value = app.age;
        document.querySelector("#nid_no").value = app.nid_no;
        document.querySelector("#address").value = app.permanent_address;
        
        

    });

    var i;
    var user_details;
    Firebase.ref('Flats').on('value', function (snapshot) {
        var s = snapshot.val();

        for (i = 0; i < s.length; i++) {

            if (s[i] == undefined) {
                document.querySelector("#room_no").value = i;
                break;
            }
        }
    });

}

Firebase.ref('application').on('value', function (snapshot) {
    var app = snapshot.val();
    var result = Object.keys(app).map((key) => [{
        ...app[key],
        key: key
    }]);
    //  console.log(result)
    setUptable(result);
});

var table_row = document.querySelector(".table_data");

const setUptable = (data) => {

    let html = `<thead>
    <tr class="w3-green">
       <th>Name</th>
       <th>Email</th>
       <th>Phone Number</th>
       <th>Action</th>
    </tr>
 </thead>`;
    data.forEach(element => {
        //console.log(element[0].name)
        const li = `
        <tr>
            <td>${element[0].name}</td>
            <td>${element[0].email}</td>
            <td>${element[0].Phone_number}</td>
            <td class="text-center">
            <button class="btn btn-outline-success  w-100 check" onclick="checkPopup(value)" value="${element[0].key}">check</button>
            </td>
        </tr>
        `;

        html += li;

    });
    table_row.innerHTML = html;
}

const approved = () => {
    // document.querySelector("#name").value = app.name;
    // document.querySelector("#email").value = app.email;
    // document.querySelector("#phone_number").value = app.Phone_number;
    // document.querySelector("#age").value = app.age;
    // document.querySelector("#nid_no").value = app.nid_no;
    // document.querySelector("#address").value = app.permanent_address;
    console.log(key1);
}