var win = Ti.UI.createWindow({
	title:'Home',
	backgroundColor : 'white',
	layout : 'vertical'
});
var lisnrsdk = require('ti.lisnr.sdk');

lisnrsdk.addEventListener('statusChanged', function(e) {
	statusLabel.text = 'Status changed from "' + e.from + '" to "' + e.to + '"';
	if(e.to!='listening'){
		lestenButton.title='Start Listening';
	}else{
		lestenButton.title='Stop Listening';
	}
});

lisnrsdk.addEventListener('textToneReceived', function(e) {
	activityLabel.text = 'Text Tone Received : "' + e.text + '"';
});

lisnrsdk.addEventListener('contentReceived', function(e) {
	
	if(e.contentType=='image'){
		var win3 = Titanium.UI.createWindow({
			url : 'image_content_viewer.js',
			backgroundColor : 'white',
			title : e.contentTitle,
			content : e
		});
		win1.openWindow(win3, {
			animated : true
		});
	}
});

var statusLabel = Ti.UI.createLabel({
	text : '',
	height : Ti.UI.SIZE,
	left : 10,
	right : 10,
	top : 100,
	textAlign : 'center'
});
win.add(statusLabel);

var lestenButton = Ti.UI.createButton({
	title : 'Start Listening',
	height : Ti.UI.SIZE,
	width : Ti.UI.SIZE,
	top : 10
});
lestenButton.addEventListener('click', function() {
	if(lestenButton.title=='Start Listening'){
		lestenButton.title='Stop Listening';
	    lisnrsdk.startListening();
	}else{
		lestenButton.title='Start Listening';
		lisnrsdk.stopListening();
	}
});
win.add(lestenButton);

var textField = Ti.UI.createTextField({
	height : 50,
	width : 200,
	top : 10,
	hintText : 'Text to Broadcast',
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
win.add(textField);

var playTextTone = Ti.UI.createButton({
	title : 'Play Text Tone',
	height : Ti.UI.SIZE,
	width : Ti.UI.SIZE,
	top : 10
});
playTextTone.addEventListener('click', function() {
	lisnrsdk.playTextTone({
		text : textField.value
	});
});
win.add(playTextTone);

var activityLabel = Ti.UI.createLabel({
	text : '',
	height : Ti.UI.SIZE,
	left : 10,
	right : 10,
	top : 10,
	textAlign : 'center'
});
win.add(activityLabel);

win.addEventListener('open', function() {
	//lisnrsdk.initialize();
	//if(Titanium.Media.hasAudioPermissions()){
	//lisnrsdk.initialize();
	//}else{
	Titanium.Media.requestAudioPermissions(function(e) {
		Ti.API.info(JSON.stringify(e));
		if (e.success) {
			lisnrsdk.initialize();
		}
	});
	//}
	Ti.App.iOS.registerUserNotificationSettings({
		types : [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE]
	});
});

var win1 = Titanium.UI.iOS.createNavigationWindow({
	window : win
});
win1.open(); 