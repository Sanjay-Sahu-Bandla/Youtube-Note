<script>
	
	var local_value = localStorage.getItem('user_auth_key');

	$.POST('operations.php', {'local_value':local_value},
		function(data) {
			alert('kk');
		});

</script>