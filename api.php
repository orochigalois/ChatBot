<?php
define('USER_AGENT', 'Mozilla/4.0');


function curl_request($url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_USERAGENT, USER_AGENT);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 120);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}

$keyword = $_GET['msg'];
$wordcode = rawurlencode($keyword);
$word_url =  'http://api.qingyunke.com/api.php?key=free&appid=0&msg=' . $wordcode;


$result = curl_request($word_url);
// $jsonobj = json_decode($result);

print $result;

die();

