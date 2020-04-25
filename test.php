<?php

if(isset($_POST['channel_name'])&&$_POST['video_info']&&$_POST['current_time']) {

	$user_auth_key = $_POST['user_auth_key'];

	$JSON_data = file_get_contents("users/".$_POST['user_auth_key'].".json");
	$array = json_decode($JSON_data,true);

	$add_data = array(
		'channel_name'=>$_POST['channel_name'],
		'video_title'=>$_POST['video_info'],
		'current_time'=>$_POST['current_time'],
		'user_auth_key'=>$_POST['user_auth_key'],
		'note'=>$_POST['note'],
		'video_link'=>$_POST['video_link']
	);

	array_unshift($array, $add_data);

	if(file_put_contents("users/".$_POST['user_auth_key'].".json",json_encode($array,JSON_PRETTY_PRINT))) {

		echo "success";

	}

	else {
		echo "went wrong";
	}
}

?>