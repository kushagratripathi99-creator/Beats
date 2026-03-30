<?php
	include("conn.php"); 
	$name=$_POST['nme'];
	$dob=$_POST['dobb'];
	$gd=$_POST['gdr'];
	$phn=$_POST['mb'];
	$rg=$_POST['rgn'];
	$eml=$_POST['el'];
	$passw= password_hash($_POST['pass'], PASSWORD_DEFAULT ); //to hide password in database

	$sql=" INSERT INTO registration(name,dob,gender,contact,region,email,pass) VALUES('$name','$dob','$gd','$phn','$rg','$eml','$passw')";
	if($conn->query($sql)==TRUE)
	{
	header("location: beatslogin.html");
}
else{
	echo "Failed";
}
$conn->close();


?>