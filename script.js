// document.getElementsByTagName('body')[0].style.display = 'none';

// document.getElementById('channel_name').innerHTML = '123';
// alert(window.location.pathname.split('/').pop());

// alert('script:'+window.localStorage.getItem('user_auth_key'));

if (localStorage.getItem("user_auth_key") === null) {

	var href = window.location.pathname.split('/').pop();

	if(href == 'login.html') {
		// window.location = '';
	}
	else if(href == 'signup.html') {
		// window.location = '';	
	}
	else {
		window.location = 'login.html';
	}

  //...
}

window.onload = function() {

	setTimeout(signup, 1500);

	var user_auth_key = localStorage.getItem('user_auth_key');

	var file = "https://sanjaysahubandla.000webhostapp.com/Projects/extension/users/"+user_auth_key+".json";
	var rawFile = new XMLHttpRequest();
	rawFile.open("POST", file, false);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4) {
			if(rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
                // var value = JSON.stringify;
                var value = JSON.parse(allText);
                // now display on browser :)

                for(var i=0; i<value.length; i++) {

                	var content = document.getElementById('content');

                	var card = document.createElement('div');
                	card.setAttribute("class", "card");

                	content.appendChild(card);

                	var card_body = document.createElement('div');
                	card_body.setAttribute("class", "card-body");

                	card.appendChild(card_body);

                	var card_title = document.createElement('h5');
                	card_title.setAttribute("class", "card-title text-primary");
                	card_title.innerHTML = value[i]['channel_name'];
                	card_body.appendChild(card_title);

                	var card_text = document.createElement('div');
                	card_text.setAttribute("class", "card-text");
                	card_text.innerHTML = value[i]['video_title'];
                	card_body.appendChild(card_text);

                	var small = document.createElement('small');
                	var cite = document.createElement('cite');
                	cite.innerHTML = "Paused Time : <div class='text-success d-inline'>"+value[i]['current_time']+"</div>";

                	card_body.appendChild(small);
                	small.appendChild(cite);

                	// document.getElementById('channel_name').innerHTML = value[i]['channel_name'];
                	// document.getElementById('video_title').innerHTML = value[i]['video_title'];
                	// document.getElementById('stopped_time').innerHTML = value[i]['current_time'];
                }
            }
        }
    }
    rawFile.send(null);
    
}

// Login

document.getElementById('login_form').addEventListener('submit', function(evt){

	evt.preventDefault();
	
	var dir = 'https://sanjaysahubandla.000webhostapp.com/Projects/extension/add_user.php';
	var request = new XMLHttpRequest();

	var login_username = document.getElementById("login_username").value;
	var login_password = document.getElementById("login_password").value;

	var data = "&login_username="+login_username+"&login_password="+login_password;

	request.open("POST", dir, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.setRequestHeader("Content-length", data.length);
	request.setRequestHeader("Connection", "close");

	request.onload = function() {

		if (request.status === 200) {

			// alert(1);

			var responseArray = request.responseText.split("||");

			if(responseArray[0] === 'login success') {

				alert('Login successfully completed !');

				var id = responseArray[1];

				window.localStorage.setItem("user_auth_key",id);
				// localStorage.removeItem("key");
				// alert(id);
				chrome.storage.sync.set({'value': id}, function() {


				});

				window.location = 'popup.html';
			}
			else{alert('Invalid Credentials')}
		}

	else {
		alert('Something went wrong !');
	}
};

    // sending data here
    request.send(data);
});

// document.getElementById('some').addEventListener('click', function(){

// 	setTimeout(signup, 1500);
// });

function signup() {

// Signup

document.getElementById('signup_form').addEventListener('submit', function(e){
	
	e.preventDefault();
	// document.getElementById('user_auth_key').style.display = 'none';
	// document.getElementById('username').style.display = 'none';
	// document.getElementById('password').style.display = 'none';

	var dir = 'https://sanjaysahubandla.000webhostapp.com/Projects/extension/add_user.php';
	var request = new XMLHttpRequest();

	var id = document.getElementById("user_auth_key").value = Date.now();
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	var data = "id="+id +"&username="+username+"&password="+password;

	request.open("POST", dir, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.setRequestHeader("Content-length", data.length);
	request.setRequestHeader("Connection", "close");

	request.onload = function() {

		if (request.status === 200) {

			// alert(1);

			if(request.responseText == 'registraion success') {

				alert('Registration successfully completed !');

				window.localStorage.setItem("user_auth_key",id);
				// localStorage.removeItem("key");
				// alert(id);
				chrome.storage.sync.set({'value': id}, function() {


				});

				window.location = 'popup.html';
			}
		}

		else {
			alert('Something went wrong !');
		}
	};

    // sending data here
    request.send(data);
});

}