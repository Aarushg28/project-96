
var firebaseConfig = 
{
    apiKey: "AIzaSyBayuW8KdyBOZSuZ4praMA1QcB1hRwb-QU",
    authDomain: "letschat-bbcf4.firebaseapp.com",
    databaseURL: "https://letschat-bbcf4-default-rtdb.firebaseio.com",
    projectId: "letschat-bbcf4",
    storageBucket: "letschat-bbcf4.appspot.com",
    messagingSenderId: "1029821235682",
    appId: "1:1029821235682:web:d01372fc1608040d90f9bb"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("username");
document.getElementById("user_name").innerHTML = "Welcome "+username+" !"

function addRoom()
{
      roomname = document.getElementById("roomname").value;
      firebase.database().ref("/").child(roomname).update(
            {
                  purpose : "Adding Room"
            });
      localStorage.setItem("roomname" , roomname);
      window.location = "chat_page.html";
}

function getData() 
{firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
      Room_names = childKey;
      //Start code
      console.log("Roomname = "+ Room_names);
      row = "<div class='room_name' id = "+ Room_names +" onclick = 'redirectToRoomname(this.id)'># "+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML +=  row  ;
      //End code
});});}
getData();

function redirectToRoomname(name){
    console.log(name);
    localStorage.setItem("roomname" , name);
    window.location = "chat_page.html";
}

function logOut()
{
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location = "index.html";
}
