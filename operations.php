<?php

echo "<script>

if (!(localStorage.getItem('user_auth_key') === null)) {

	alert('User already exists');
	javascript:history.go(-1);
	return true;

}
</script>";

// echo $_POST['local_value'];

// $file = "<script>localStorage.getItem('user_auth_key')</script>";

// $file = $_POST['local_value'];

// if(!is_file($file.".json")) {

// 	file_put_contents($file.".json",json_encode('[]',JSON_PRETTY_PRINT));

// }

// echo $_POST['']

if(isset($_POST['username'])&&($_POST['password'])&&($_POST['id'])) {

	$JSON_data = file_get_contents("users_data.json");
	$array = json_decode($JSON_data,true);

	for($i=0; $i<count($array); $i++) {

		if(($array[$i]['username'] == $_POST['username'])&&($array[$i]['password'] == $_POST['password'])) {

			echo "<script>

			alert('User already exits');
			javascript:history.go(-1);

			</script>";

			return;
		}
	}

	$id = $_POST['id'];

	$array[] = array(
		'id'=>$id,
		'username'=>$_POST['username'],
		'password'=>$_POST['password'],
		'timestamp'=>date('d-m-Y h:i:s')
	);

	if(file_put_contents("users_data.json",json_encode($array,JSON_PRETTY_PRINT))) {

		echo "<script>

		alert('Registered successfully');
		localStorage.setItem('user_auth_key','".$id."');
		javascript:history.go(-1);		

		</script>";

	}
}

?>