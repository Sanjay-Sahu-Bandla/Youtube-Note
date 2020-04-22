// alert(window.localStorage.removeItem('user_auth_key'));
// chrome.storage.sync.remove('value', function(Items) {
//         alert("removed");
// });

chrome.storage.sync.get(['value'], function(result) {

	if(result.value != null) {

		setTimeout(myFunction, 1000);
	}
});

function myFunction() {

	$('.ytd-subscribe-button-renderer').first().before('<button id="start_note" style=" border:none; outline:none;  border-radius: 10px;  background: #449d44;  color:#fff; padding:5px 20px;  box-shadow: 2px 2px 5px #f0f0f0;">START NOTING</button>');

	$('#start_note').click(function() {

		var channel_name = $('.ytd-channel-name a.yt-formatted-string').html();
		var video_info = $('h1 yt-formatted-string.ytd-video-primary-info-renderer').html();
		var current_time = $('.ytp-time-current').html();

		$('#card #channel_name').html(channel_name);
		$('#card #video_title').html(video_info);
		$('#card #stopped_time').html(current_time);

		// var user_auth_key = localStorage.getItem('user_auth_key');

		chrome.storage.sync.get(['value'], function(result) {
			console.log('Value currently is ' + result.value);

			// alert(result.value);

			var user_auth_key = result.value;

			var xhttp = new XMLHttpRequest();
			xhttp.open("POST", "https://sanjaysahubandla.000webhostapp.com/Projects/extension/test.php", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("channel_name="+channel_name+"&video_info="+video_info+"&current_time="+current_time+"&user_auth_key="+user_auth_key);
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {

					var response = this.responseText;
					// alert(response);
					if(response == ('success' || '')) {
						// alert(this.responseText);
					}
					else if(response == 'went wrong'){
						alert('Something went wrong');
					}
				}
			};

		});

		// alert('101:'+user_auth_key);

		// alert("channle name: "+channel_name+'\n\n'
		// 	+"video name: "+video_info+'\n\n'
		// 	+"current time: "+current_time);

	});
}