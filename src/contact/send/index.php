<?php
// require_once __DIR__ . '/config.inc.php';
$config_from = 'contact@ingo-steinke.com';
$config_to = 'contact@ingo-steinke.com';
$config_tospamtrap = 'contact@ingo-steinke.com';
$config_subject = 'Contactform ISD';
$config_custheader = '';
$config_verbose = true;

header('Cache-Control: no-store');
header('Pragma: no-cache');

/* don’t let your default response header reveal technical details */
header('X-Powered-By: openmindculture');

$post_name     = trim(filter_var($_REQUEST['contactform-field-name'], FILTER_SANITIZE_STRING));
$post_emailfon = trim(filter_var($_REQUEST['contactform-field-emailfon'], FILTER_SANITIZE_EMAIL));
$post_msg      = trim(filter_var($_REQUEST['contactform-field-message'], FILTER_SANITIZE_STRING));
$spamtrap1     = filter_var($_REQUEST['contactform-field-captcha'], FILTER_SANITIZE_STRING);
$spamtrap2     = filter_var($_REQUEST['contactform-field-homepage'], FILTER_SANITIZE_STRING);
$suspectedSpam = false;

/* require spam trap 'captcha' be empty, require msg not empty */
if (
  !empty($spamtrap1) ||
  !empty($spamtrap2) ||
  'POST' != $_SERVER['REQUEST_METHOD'] ||
  strpos($post_msg, 'intengo yakho') !== false ||
  strpos($post_msg, 'your price') !== false ||
  strpos($post_msg, 'the prices') !== false ||
  strpos($post_msg, 'eich pris') !== false ||
  strpos($post_msg, 'Äre Präis') !== false ||
  strpos($post_msg, 'ég') !== false ||
  strpos($post_msg, 'ə') !== false ||
  strpos($post_msg, 'হা') !== false ||
  strpos($post_msg, 'прайс') !== false ||
  strpos($post_msg, 'я') !== false ||
  strpos($post_msg, 'ë') !== false ||
  strpos($post_msg, 'ụ') !== false ||
  strpos($post_msg, 'ị') !== false ||
  strpos($post_name, 'Masonbeids') !== false ||
  (empty($post_name) && empty($post_emailfon) && empty($post_msg))
) {
  $suspectedSpam = true;
}

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
  /* AJAX request from modern browser: at this point, there isn't anything to download anymore */
  header('Content-Type: application/json');
  header('Connection: close');
  if ( $suspectedSpam ) {
    echo '{"Status":"503 Service Unavailable"}';
  } else {
    echo '{"Status":"200 OK"}';
  }
} else {
  /* fallback for plain FORM SUBMIT */
  header('Content-Type: text/html');
  header('Refresh: 5; url=https://www.ingo-steinke.com/');
  if ( $suspectedSpam ) {
    header('Status: 503 Service Unavailable');
    echo '503 Service Unavailable - please try again later';
  } else {
    echo '<!DOCTYPE HTML><html lang=de><head><meta charset="utf-8"><title>Ingo Steinke - Contact Form</title></head>';
    echo '<body><h1>Thanks for your message!</h1>';
    echo '<a href="https://www.ingo-steinke.com/">Back to ingo-steinke.com</a>';
    echo '</body></html>';
  }
}

$to = $config_to;
$subject = $config_subject;

if ( $suspectedSpam ) {
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

if ( $config_verbose ) {
  $message .= "\r\n";
  $message .= "\r\n";
  $message .= "SERVER_NAME: " . $_SERVER['SERVER_NAME'] . "\r\n";
  $message .= "REQUEST_METHOD: " . $_SERVER['REQUEST_METHOD'] . "\r\n";
  $message .= "HTTP_ACCEPT: " . $_SERVER['HTTP_ACCEPT'] . "\r\n";
  $message .= "HTTP_REFERER: " . $_SERVER['HTTP_REFERER'] . "\r\n";
  $message .= "HTTP_USER_AGENT: " . $_SERVER['HTTP_USER_AGENT'] . "\r\n";
  $message .= "REMOTE_ADDR: " . $_SERVER['REMOTE_ADDR'] . "\r\n";
  $message .= "HTTP_X_FORWARDED_FOR: " . $_SERVER['HTTP_X_FORWARDED_FOR'] . "\r\n";
}

if (!empty($message)) {
  $headers = 'MIME-Version: 1.0' . "\r\n".
    'Content-Type: text/plain; charset=UTF-8' . "\r\n".
    'From: ' . $config_from . "\r\n".
    'X-Requested-With: ' . $_SERVER['HTTP_X_REQUESTED_WITH'] . "\r\n".
    'X-Request-Method:'  . $_SERVER['REQUEST_METHOD'] . "\r\n".
    'X-Mailer: openmindculture'. "\r\n".
    $config_custheader;

  mail($to, $subject, $message, $headers);
}
$message .= "\r\n";


