// *****************
// Support code for the IM / click-to-call demo application for Phono.
// *****************


var CONFIG = {
    phono_key:  "**PUT YOUR PHONO API KEY HERE**",
    im_address: "**PUT YOUR BOT IM ADDRESS HERE**",
    voice_app:  "app:**PUT YOU VOXEO APP NUMBER HERE**",
    app_name:   "**PUT YOUR APP NAME HERE**"
};

var PHONO_OPTIONS = {
    apiKey: CONFIG.phono_key,
    onReady: function() {
	$("#message")[0].disabled = false;
	$("#click2call")[0].disabled = false;
	$("#message").focus();
    },
    messaging: {
	onMessage: function(event) {
	    addInteraction(CONFIG.app_name, event.message.body, 'server');
	}
    }
};

function processKey(event) {
  if (event.keyCode == 13) {
      sendMessage();
      return false;
  } else { 
      return true; 
  }
}

function sendMessage() {
    var msg = $('#message').val();
    if (msg == '') return;

    $('#message').val("");
    phono.messaging.send(CONFIG.im_address, msg);
    addInteraction('Me', msg, 'client');
}

function addInteraction(who, msg, cls) {
    var dialogDiv = $('#dialog');
    dialogDiv.append($("<div class='msg_" + cls + "'><b>" + who + ":</b> " + msg + "</div>"));
    dialogDiv[0].scrollTop = dialogDiv[0].scrollHeight;
}

var call = null;

function callApp() {
    if (call == null) {
	call = phono.phone.dial(CONFIG.voice_app, {
		onAnswer: function() {
		    $("#click2call").text("Hangup");
		},
		onHangup: function() {
		    call = null;
		    $("#click2call").text("Call me!");
		}
	    });
    } else {
	call.hangup();
    }
}

var phono = $.phono(PHONO_OPTIONS);

