var ros = new ROSLIB.Ros();

// If there is an error on the backend, an 'error' emit will be emitted.
ros.on('error', function(error) {
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('connected').style.display = 'none';
  document.getElementById('closed').style.display = 'none';
  document.getElementById('error').style.display = 'inline';
  console.log(error);
});
// Find out exactly when we made a connection.
ros.on('connection', function() {
  console.log('Connection made!');
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('error').style.display = 'none';
  document.getElementById('closed').style.display = 'none';
  document.getElementById('connected').style.display = 'inline';
});
ros.on('close', function() {
  console.log('Connection closed.');
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('connected').style.display = 'none';
  document.getElementById('closed').style.display = 'inline';
});
// Create a connection to the rosbridge WebSocket server.
var x = location.hostname;
ros.connect('ws://' + x + ':9090');

//JointState Listener
var listener = new ROSLIB.Topic({
  ros : ros,
  name : '/joint_states',
  messageType : 'sensor_msgs/JointState'
});

listener.subscribe(function(message) {
  document.getElementById("p1").innerHTML = message.position[0];
  document.getElementById("p2").innerHTML = message.position[1];
  document.getElementById("p3").innerHTML = message.position[2];
  document.getElementById("p4").innerHTML = message.position[3];
  document.getElementById("p5").innerHTML = message.position[4];
  // console.log(message);
});

//JogParam
var jogstate = new ROSLIB.Param({
  ros : ros,
  name : 'jogstate'
});

//Then we set the value of the param, which is sent to the ROS Parameter Server.
jogstate.set([0,0,0,0,0,0]);
jogstate.get(function(value) {
  console.log(value);
});
//xplus
function xplusDown() {
  jogstate.set([1,0,0,0,0,0]);
}
function xplusUp() {
  jogstate.set([0,0,0,0,0,0]);
}
//xminus
function xminusDown() {
  jogstate.set([0,1,0,0,0,0]);
}
function xminusUp() {
  jogstate.set([0,0,0,0,0,0]);
}
//yplus
function yplusDown() {
  jogstate.set([0,0,1,0,0,0]);
}
function yplusUp() {
  jogstate.set([0,0,0,0,0,0]);
}
//yminus
function yminusDown() {
  jogstate.set([0,0,0,1,0,0]);
}
function yminusUp() {
  jogstate.set([0,0,0,0,0,0]);
}
//zplus
function zplusDown() {
  jogstate.set([0,0,0,0,1,0]);
}
function zplusUp() {
  jogstate.set([0,0,0,0,0,0]);
}
//zminus
function zminusDown() {
  jogstate.set([0,0,0,0,0,1]);
}
function zminusUp() {
  jogstate.set([0,0,0,0,0,0]);
} 