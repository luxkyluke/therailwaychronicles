<?php

// AUTHORIZE
$username = 'Aleqsandr___'; // instagram username
$access_token = '7e103652224f498187259a01b9461ccc'; // instagram access token
$count = '20'; // numbers of shots I want

// INCLUDE THE PHP CLASS
include('instagram.php');

// INSTANCIATE
if(!empty($username) && !empty($access_token)){
$isg = new instagramPhp($username,$access_token); // instanciates the class with the parameters
$shots = $isg->getUserMedia(array('count'=>$count)); // get the shots from instagram
} else {
echo'Please update your settings to provide a valid username and access token';
}

// DISPLAY
if(!empty($shots)){ echo $isg->simpleDisplay($shots); }

?>