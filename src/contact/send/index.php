<?php
// require_once __DIR__ . '/config.inc.php';
$config_from = 'contact@ingo-steinke.com';
$config_to = 'contact@ingo-steinke.com';
$config_tospamtrap = 'contact@ingo-steinke.com';
$config_subject = 'Contactform ISD';
$config_custheader = '';

header('Cache-Control: no-store');
header('Pragma: no-cache');

/* don’t let your default response header reveal technical details */
header('X-Powered-By: openmindculture');

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
  /* AJAX request from modern browser: at this point, there isn't anything to download anymore */
  header('Content-Type: application/json');
  header('Connection: close');
  echo '{"Status":"200 OK"}';
} else {
  /* fallback for plain FORM SUBMIT */
  header('Content-Type: text/html');
  header('Refresh: 5; url=https://www.ingo-steinke.com/');
  echo '<!DOCTYPE HTML><html lang=de><head><meta charset="utf-8"><title>Ingo Steinke - Contact Form</title></head>';
  echo '<body><h1>Thanks for your message!</h1>';
  echo '<a href="https://www.ingo-steinke.com/">Back to ingo-steinke.com</a>';
  echo '</body></html>';
}

$post_name     = filter_var($_REQUEST['contactform-field-name'], FILTER_SANITIZE_STRING);
$post_emailfon = filter_var($_REQUEST['contactform-field-emailfon'], FILTER_SANITIZE_EMAIL);
$post_msg      = filter_var($_REQUEST['contactform-field-message'], FILTER_SANITIZE_STRING);
$spamtrap1     = filter_var($_REQUEST['contactform-field-captcha'], FILTER_SANITIZE_STRING);
$spamtrap2     = filter_var($_REQUEST['contactform-field-homepage'], FILTER_SANITIZE_STRING);

$to = $config_to;
$subject = $config_subject;

/* require spamtrap 'captcha' be empty, require msg not empty         */
/* on error only send error msg to webmaster, otherwise send to owner */
if (!empty($spamtrap1) || !empty($spamtrap2) || 'POST'!=$_SERVER['REQUEST_METHOD'] ){
  $to      = $config_tospamtrap;
  $subject = '[Spamverdacht] ' . $subject;
}

$message = '';
if (!empty($post_name)) {
  $message .= 'Name: ' .  $post_name . "\r\n";
}
if (!empty($post_emailfon)) {
  $message .= 'Kontakt: ' .  $post_emailfon . "\r\n";
}
if (!empty($post_msg)) {
  $message .=   $post_msg . "\r\n";
}
$message .= "\r\n";

$headers = 'MIME-Version: 1.0' . "\r\n".
  'Content-Type: text/plain; charset=UTF-8' . "\r\n".
  'From: ' . $config_from . "\r\n".
  'X-Requested-With: ' . $_SERVER['HTTP_X_REQUESTED_WITH'] . "\r\n".
  'X-Request-Method:'  . $_SERVER['REQUEST_METHOD'] . "\r\n".
  'X-Mailer: openmindculture'. "\r\n".
  $config_custheader;

mail($to, $subject, $message, $headers);
