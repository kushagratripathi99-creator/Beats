<?php 
include("conn.php");
if (isset($_POST['lg'])){
	$eml=$_POST['el'];
	$passw=$_POST['pass'];
	$query = "SELECT * From registration WHERE email='$eml' AND pass='$passw'";
	$result= mysqli_query($conn, $query);
	
	
		if (mysqli_num_rows($result)==1){
			header("location : index.html");
			exit;
		} else {
			echo "Wrong Password or wrong email";
		}
		
	}
	

?>


