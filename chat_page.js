
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
    

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("username");
roomname = localStorage.getItem("roomname");
room_name = roomname.charAt(0).toUpperCase() + roomname.slice(1);
document.getElementById("room_name").innerHTML = room_name;

function send(){

      msg = document.getElementById("msg").value;
      firebase.database().ref(roomname).push({
            name : user_name,
            message : msg,
            like : 0 
      });
      document.getElementById("msg").value = ""; 
}


function getData(){
firebase.database().ref("/"+roomname).on('value', function(snapshot) { document.getElementById("output1").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         
      firebase_message_id = childKey;
      message_data = childData;

      console.log(firebase_message_id);
      console.log(message_data);

      name = message_data['name'] ;
      message = message_data['message'];
      like = message_data['like'];

      name_with_tag = "<h4>"+ name +"&nbsp;<img class='user_tick' src = 'tick.png'></h4>";
      message_with_tag = "<h4 class= 'message_h4'>" + message + "</h4>";
      like_btn = "<button class='btn btn-primary like_msg' id="+firebase_message_id +" value="+like+" onclick ='updatelike(this.id)'>";
      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up '> "+like+"</span></button><hr>";

      row = name_with_tag+message_with_tag+like_btn+span_with_tag;
      document.getElementById("output1").innerHTML += row;
//End code
      } });  }); }
getData();

function updatelike(message_id){

      console.log("clicked on like button - "+message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes)+ 1;
      console.log(updated_likes);

      firebase.database().ref(roomname).child(message_id).update({
            like : updated_likes
      });
}

function logOut(){
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location.replace("index.html") ;
}