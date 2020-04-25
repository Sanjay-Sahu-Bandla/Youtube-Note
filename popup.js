chrome.storage.sync.get(['value'], function(result) {

	if(result.value != null) {

		setTimeout(myFunction, 1000);

	}
});

window.onload = function() {


}

function myFunction() {

	chrome.extension.onMessage.addListener(function(request,sender,sendResponse) {

		if(request.command == "start") {

			alert(request.url_path);

			var note_time = request.url_path.split('=').pop();

			// Unable to get current time of the video //

			/* var ytplayer = $("video")[0];

			ytplayer.currentTime = 7;
			alert(ytplayer.currentTime); */

		}
		else {
			alert('Something went wrong !');
		}

	});


	$('.ytd-subscribe-button-renderer').first().before('<button id="start_note" style=" border:none; outline:none;  border-radius: 10px;  background: #449d44;  color:#fff; padding:5px 20px;  box-shadow: 2px 2px 5px #f0f0f0; cursor: pointer">START NOTING</button>');

	$('#start_note').click(function() {

		var channel_name = $('.ytd-channel-name a.yt-formatted-string').html();
		var video_info = $('h1 yt-formatted-string.ytd-video-primary-info-renderer').html();
		var current_time = $('.ytp-time-current').html();
		// var video_link = window.location.href;

		// var current_time = "1:29:30";

		var a = current_time.split(':');

		var hrs = a.length;

		var seconds = ']';

		switch(hrs) {

			case 3 : seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
			break;
			case 2 : seconds = Number(a[0]) * 60 + Number(a[1]);
			break;
			case 1 : seconds = a;
			break;
		}

		$('#card #channel_name').html(channel_name);
		$('#card #video_title').html(video_info);
		$('#card #stopped_time').html(current_time);

		chrome.storage.sync.get(['value'], function(result) {
			console.log('Value currently is ' + result.value);

			var user_auth_key = result.value;
			var note;

			var href = window.location.href.split('&')[0];

			var video_link = href+'&t='+seconds;

			video_link = video_link.replace('&', '%26');

			// alert(video_link);

			swal("Note something here:", {
				content: "input",
			})
			.then(function(note) {

				// alert(coinName);

				if(note == null) {
					note = 'No notes added !'
				}

				sendData(note,video_link);
				// alert(99);
				// setTimeout(doso,1000);
			});

		// 	function doso() {
		// 	// alert(0);
		// 	alert("note: "+note);

		// 	sendData(note);
		// 	// alert(1);
		// }

		function sendData(note) {

			var xhttp = new XMLHttpRequest();
			xhttp.open("POST", "http://localhost/Youtube%20Note/test.php", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send(
				"channel_name="+channel_name+
				"&video_info="+video_info+
				"&current_time="+current_time+
				"&user_auth_key="+user_auth_key+
				"&note="+note+
				"&video_link="+video_link);

			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {

					var response = this.responseText;

					// if(response == ('success' || '')) {
					// 	alert(this.responseText);
					// }
					if(response == 'went wrong'){
						alert('Something went wrong');
					}
					else {
						swal({
							title: "Updated !",
							text: "Your note has been updated !.",
							type: "success",
							timer: 1500
						});
					}
				}
			}
		}

		

	});

		// alert('101:'+user_auth_key);

		// alert("channle name: "+channel_name+'\n\n'
		// 	+"video name: "+video_info+'\n\n'
		// 	+"current time: "+current_time);

	});
}