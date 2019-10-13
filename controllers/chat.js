
//video chat app by PubNub's webRTC
var video_out = document.getElementById("videoContainer");
function login(form) {
	var phone = window.phone = PHONE({
	    number        : form.username.value || "Anonymous", // listen on username line else Anonymous
	    publish_key   : 'pub-c-6f912783-d39b-400e-83a5-e27927f4d7f0', // My Pub Key
	    subscribe_key : 'sub-c-a7c879c2-e7c6-11e9-9f1b-ce77373a3518', // My Sub Key
	});	
	phone.ready(function(){form.username.style.background="#66ff6b"; form.login_submit.hidden="true"; });
	phone.receive(function(videoSession){

		videoSession.connected(function(videoSession) { video_out.appendChild(videoSession.video); showModal();});
		
	    videoSession.ended(function(videoSession) { video_out.innerHTML=''; });
	});
	return false;
}
    
function makeCall(form){
	if (!window.phone) alert("Login First!");
	else phone.dial(form.number.value);
	return false;
}
    
function showModal(){
    $("#showModal").click();
}
function errWrap(fxn, form){
	try {
		return fxn(form);
	} catch(err) {
		//error message if using the web chat on browser that doesn't support it...
		alert("WebRTC is currently only supported by Chrome, Opera, and Firefox");
		return false;
	}
}
