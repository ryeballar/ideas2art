<?php

function sendEmail($message) {
	$receiver = 'ryeballar@gmail.com';
	$subject = "Ideas2Art contact form";
	$headers = 'From:ryeballar@gmail.com' . "\r\n";

	echo mail($receiver, $subject, $message);
}

$postdata = file_get_contents('php://input');
$request = json_decode($postdata);

if (isset($request->name) &&
	isset($request->email)) {

	$form['name'] = trim($request->name);
	$form['email'] = trim($request->email);
	$form['message'] = isset($request->message)? trim($request->message): "";
	$form['contact_number'] = isset($request->contact) ? trim($request->contact): "";


$message = <<<EOT
Name: $form[name]
Email: $form[email]
Contact Number: $form[contact_number]
Message: $form[message]
EOT;
	sendEmail($message);
} else {
	echo false;
}