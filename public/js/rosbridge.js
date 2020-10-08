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
});

//jogState Publisher
var jogPublisher = new ROSLIB.Topic({
  ros : ros,
  name : '/jogState',
  messageType : 'geometry_msgs/Pose'
});
var jogMsg = new ROSLIB.Message({
  position : {
    x : 0,
    y : 0,
    z : 0
  },
  orientation : {
    x : 0,
    y : 0,
    z : 0,
    w: 0
  }
});
uptimer = setInterval(function () {
  jogPublisher.publish(jogMsg);
}, 100);

//xplus
function xplusDown() {
  var jogMsg = new ROSLIB.Message({
    position : {
      x : 0.01,
      y : 0,
      z : 0
    },
    orientation : {
      x : 0,
      y : 0,
      z : 0,
      w: 0
    }
  });
  clearInterval(uptimer);
  downtimer = setInterval(function () {
    jogPublisher.publish(jogMsg);
  }, 25);
}
//xminus
function xminusDown() {
  console.log("called");
  var jogMsg = new ROSLIB.Message({
    position : {
      x : -0.01,
      y : 0,
      z : 0
    },
    orientation : {
      x : 0,
      y : 0,
      z : 0,
      w: 0
    }
  });
  clearInterval(uptimer);
  downtimer = setInterval(function () {
    jogPublisher.publish(jogMsg);
  }, 25);
}
//yplus
function yplusDown() {
  var jogMsg = new ROSLIB.Message({
    position : {
      x : 0,
      y : 0.01,
      z : 0
    },
    orientation : {
      x : 0,
      y : 0,
      z : 0,
      w: 0
    }
  });
  clearInterval(uptimer);
  downtimer = setInterval(function () {
    jogPublisher.publish(jogMsg);
  }, 25);
}
//yminus
function yminusDown() {
  var jogMsg = new ROSLIB.Message({
    position : {
      x : 0,
      y : -0.01,
      z : 0
    },
    orientation : {
      x : 0,
      y : 0,
      z : 0,
      w: 0
    }
  });
  clearInterval(uptimer);
  downtimer = setInterval(function () {
    jogPublisher.publish(jogMsg);
  }, 25);
}
//zplus
function zplusDown() {
  var jogMsg = new ROSLIB.Message({
    position : {
      x : 0,
      y : 0,
      z : 0.01
    },
    orientation : {
      x : 0,
      y : 0,
      z : 0,
      w: 0
    }
  });
  clearInterval(uptimer);
  downtimer = setInterval(function () {
    jogPublisher.publish(jogMsg);
  }, 25);
}
//zminus
function zminusDown() {
  var jogMsg = new ROSLIB.Message({
    position : {
      x : 0,
      y : 0,
      z : -0.01
    },
    orientation : {
      x : 0,
      y : 0,
      z : 0,
      w: 0
    }
  });
  clearInterval(uptimer);
  downtimer = setInterval(function () {
    jogPublisher.publish(jogMsg);
  }, 25);
}

//un-press
function Up() {
  // console.log("called");
  var jogMsg = new ROSLIB.Message({
    position : {
      x : 0,
      y : 0,
      z : 0
    },
    orientation : {
      x : 0,
      y : 0,
      z : 0,
      w: 0
    }
  });
  clearInterval(downtimer);
  uptimer = setInterval(function () {
    jogPublisher.publish(jogMsg);
  }, 25);
}