<?php

$email_to = "websitecontactform@elliotjreed.com";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: " . $_POST['rsEmail'] . "\r\n";

if (!isset($_POST['rsSubject'])) {
    $subject = "Message from elliotjreed.com";
} else {
    $subject = htmlspecialchars($_POST['rsSubject']);
}
$body = '<p><strong>Name: </strong>' . htmlspecialchars($_POST['rsName']) . '</p>';
$body .= '<p><strong>Email: </strong>' . htmlspecialchars($_POST['rsEmail']) . '</p>';
$body .= '<p><strong>Subject: </strong>' . $subject . '</p>';
$body .= '<p><strong>Message: </strong>' . htmlspecialchars($_POST['rsMessage']) . '</p>';  

if(mail($email_to, $subject, $body, $headers)) {
    $mail_sent = true;
} else {
    $mail_sent = false;
}

header('Location: http://www.elliotjreed.com');
