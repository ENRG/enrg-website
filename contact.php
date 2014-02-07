<?php
$url = 'http://localhost:3001';
$data = $_POST;

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => '{ "body": ' . json_encode($data) . ' }',
    ),
);

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
echo json_encode($result);
?>