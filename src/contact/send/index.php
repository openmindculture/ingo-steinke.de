<?php
// require_once __DIR__ . '/config.inc.php';
$config_from = 'contact@ingo-steinke.com';
$config_to = 'contact@ingo-steinke.com';
$config_tospamtrap = 'contact@ingo-steinke.com';
$config_subject = 'Contactform from ISD website';
$config_custheader = '';
$config_verbose = true;
$randombool = rand(0,1) == 1;

header('Cache-Control: no-store');
header('Pragma: no-cache');

/* don’t let your default response header reveal technical details */
header('X-Powered-By: openmindculture');

$post_name      = trim(filter_var($_REQUEST['contactform-field-name'], FILTER_SANITIZE_STRING));
$post_emailfon  = trim(filter_var($_REQUEST['contactform-field-emailfon'], FILTER_SANITIZE_STRING));
$post_msg       = trim(filter_var($_REQUEST['contactform-field-message'], FILTER_SANITIZE_STRING));
$post_referrer  = trim(filter_var($_REQUEST['referrer'], FILTER_SANITIZE_STRING));
$spamtrap1      = filter_var($_REQUEST['contactform-field-captcha'], FILTER_SANITIZE_STRING);
$spamtrap2      = filter_var($_REQUEST['contactform-field-homepage'], FILTER_SANITIZE_STRING);
$time_ip_stamp  = date("YmdHi") . '_';
$remote_addr    = trim(filter_var($_SERVER['REMOTE_ADDR'], FILTER_SANITIZE_EMAIL));
$time_ip_stamp .= $remote_addr;
$stamp_filename = './latest/' . $time_ip_stamp . '.txt';
$responseStatus = '200 OK';
$suspectedSpam = false;

/* require spam trap 'captcha' be empty, require msg not empty */
if (
  !empty($spamtrap1) ||
  !empty($spamtrap2) ||
  'POST' != $_SERVER['REQUEST_METHOD'] ||
  !strpos($post_msg, ' ') ||
  strpos($post_msg, 'intengo yakho') !== false ||
  strpos($post_msg, 'your price') !== false ||
  strpos($post_msg, 'the prices') !== false ||
  strpos($post_msg, 'ego volo scire') !== false ||
  strpos($post_msg, 'volevo sapere il tuo prezzo') !== false ||
  strpos($post_msg, 'eich pris') !== false ||
  strpos($post_msg, 'el seu preu') !== false ||
  strpos($post_msg, 'o seu prezo') !== false ||
  strpos($post_msg, 'Äre Präis') !== false ||
  strpos($post_msg, 'Kaixo, ') !== false ||
  strpos($post_msg, 'Sveiki, ') !== false ||
  strpos($post_msg, 'Dia duit, ') !== false ||
  strpos($post_msg, 'Claim Your $') !== false ||
  strpos($post_msg, ' WIN') !== false ||
  strpos($post_msg, 'Passive Income') !== false ||
  strpos($post_msg, 'Cryptocurrency') !== false ||
  strpos($post_msg, 'cannabidiol') !== false ||
  strpos($post_msg, 'verified accounts') !== false ||
  strpos($post_msg, 'greenrevolution.com') !== false ||
  strpos($post_msg, 'bulk verified accounts') !== false ||
  strpos($post_msg, 'shipping options for your order') !== false ||
  strpos($post_msg, 'omplete your purchase from the cart') !== false ||
  strpos($post_msg, 'willst du abhängen') !== false ||
  strpos($post_msg, 'surl.li') !== false ||
  strpos($post_msg, 'porn.') !== false ||
  strpos($post_msg, 'lovevoyager.page') !== false ||
  strpos($post_msg, 'meet singles') !== false ||
  strpos($post_msg, 'singles online') !== false ||
  strpos($post_msg, 'XRumer') !== false ||
  strpos($post_msg, 'Money Alert') !== false ||
  strpos($post_msg, 'promo code') !== false ||
  strpos($post_msg, 'mobilepokerclub') !== false ||
  strpos($post_msg, ' casino') !== false ||
  strpos($post_msg, 'скачать') !== false ||
  strpos($post_msg, '/exec') !== false ||
  strpos($post_msg, '//script.google.com') !== false ||
  strpos($post_msg, 'ønskede') !== false ||
  strpos($post_msg, 'ég') !== false ||
  strpos($post_msg, 'ə') !== false ||
  strpos($post_msg, 'ē') !== false ||
  strpos($post_msg, 'হা') !== false ||
  strpos($post_msg, 'ფ') !== false ||
  strpos($post_msg, 'Ոা') !== false ||
  strpos($post_msg, 'գ') !== false ||
  strpos($post_msg, '&#39;') !== false ||
  strpos($post_msg, '&#34;') !== false ||
  strpos($post_msg, 'tôi muốn biết') !== false ||
  strpos($post_msg, 'saber tu precio') !== false ||
  strpos($post_msg, 'arga Anda') !== false ||
  strpos($post_msg, 'meg akartam') !== false ||
  strpos($post_msg, 'vašu cijenu') !== false ||
  strpos($post_msg, 'прайс') !== false ||
  strpos($post_msg, 'сайт') !== false ||
  strpos($post_msg, 'я') !== false ||
  strpos($post_msg, 'б') !== false ||
  strpos($post_msg, 'в') !== false ||
  strpos($post_msg, 'д') !== false ||
  strpos($post_msg, 'и') !== false ||
  strpos($post_msg, 'й') !== false ||
  strpos($post_msg, 'спорт') !== false ||
  strpos($post_msg, 'mail.ru') !== false ||
  strpos($post_msg, ' .ru/') !== false ||
  strpos($post_msg, '//telegra.ph/') !== false ||
  strpos($post_msg, '//bit.ly') !== false ||
  strpos($post_msg, '//t.me') !== false ||
  strpos($post_msg, '//rb.gy') !== false ||
  strpos($post_msg, '//yandex.ru') !== false ||
  strpos($post_msg, 'dublikat.ru') !== false ||
  strpos($post_msg, '//telegra.ph/') !== false ||
  strpos($post_msg, '//tinyurl.com/') !== false ||
  strpos($post_msg, '//amazn.to/') !== false ||
  strpos($post_msg, 'bitcoin') !== false ||
  strpos($post_msg, 'cryptocurrency') !== false ||
  strpos($post_msg, 'cannabis') !== false ||
  strpos($post_msg, 'cbd ') !== false ||
  strpos($post_msg, 'CBD ') !== false ||
  strpos($post_msg, 'artet drink') !== false ||
  strpos($post_msg, 'impressed with the quality') !== false ||
  strpos($post_msg, ' has improved. ') !== false ||
  strpos($post_msg, 'Please send us your offer and price list.') !== false ||
  strpos($post_msg, 'share your offerings and prices') !== false ||
  strpos($post_msg, 'and pricing') !== false ||
  strpos($post_msg, 'found your company') !== false ||
  strpos($post_msg, 'a company like yours') !== false ||
  strpos($post_msg, 'wkdwodkwkifjejr') !== false ||
  strpos($post_msg, 'ë') !== false ||
  strpos($post_msg, 'ụ') !== false ||
  strpos($post_msg, 'ị') !== false ||
  strpos($post_msg, 'ā') !== false ||
  strpos($post_msg, 'Ђ') !== false ||
  strpos($post_msg, '==>') !== false ||
  preg_match("/\bsex\b/i", $post_msg) ||
  preg_match("/\bdating\b/i", $post_msg) ||
  strpos($post_name, 'Ready for love') !== false ||
  strpos($post_name, 'Amandapeaceame') !== false ||
  strpos($post_name, 'GregoryFub') !== false ||
  strpos($post_name, 'KevinKen') !== false ||
  strpos($post_name, 'Nataler') !== false ||
  strpos($post_name, 'Tracyselty') !== false ||
  strpos($post_name, 'Iyannacrigo') !== false ||
  strpos($post_name, 'xrumer') !== false ||
  strpos($post_name, 'www.') !== false ||
  str_ends_with($post_name, 'beids') ||
  str_ends_with($post_name, 'Mef') ||
  (empty(trim($post_name)) && empty(trim($post_emailfon)) && empty(trim($post_msg)))
) {
  $suspectedSpam = true;
}

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
  /* AJAX request from legitimate major modern browser users */
  header('Content-Type: application/json');
  header('Connection: close');
  if ( $suspectedSpam ) {
    if (file_exists($stamp_filename) || $randombool) {
      echo '{"Status":"403 Forbidden"}';
      $response_status = '403 Forbidden';
    } else if ('POST' != $_SERVER['REQUEST_METHOD']) {
      echo '{"Status":"405 Method Not Allowed"}';
      $response_status = '405 Method Not Allowed';
    } else  {
      echo '{"Status":"503 Service Unavailable"}';
      $response_status = '503 Service Unavailable';
    }
  } else {
    echo '{"Status":"200 OK"}';
  }
} else {
  /* fallback for plain FORM SUBMIT */
  header('Content-Type: text/html');
  header('Refresh: 6; url=https://www.ingo-steinke.com/');
  if ( $suspectedSpam ) {
    if (file_exists($stamp_filename) || $randombool) {
      header('Status: 403 Forbidden');
      echo 'Sorry, you cannot access this service right now.';
      $responseStatus = '403 Forbidden';
    } else if ('POST' != $_SERVER['REQUEST_METHOD']) {
      header('Status: 405 Method Not Allowed');
      echo 'Sorry, something went wrong trying to submit the form!';
      $responseStatus = '405 Method Not Allowed';
    } else  {
      header('Status: 503 Service Unavailable');
      sleep(6);
      echo 'Sorry, the service is unavailable. Please try again later';
      $responseStatus = '503 Service Unavailable';
    }

  } else {
    echo '<!DOCTYPE HTML><html lang=de><head><meta charset="utf-8"><title>Ingo Steinke - Contact Form</title></head>';
    echo '<body><h1>Thanks for your message!</h1>';
    echo '<a href="https://www.ingo-steinke.com/">Back to ingo-steinke.com</a>';
    echo '</body></html>';
  }
}

array_map('unlink', glob('./latest/*'));
rmdir('./latest');
if (!is_dir('./latest')) {
  mkdir('./latest');
}
touch($stamp_filename);

$to = $config_to;
$subject = $config_subject;

if ( $suspectedSpam ) {
  $to      = $config_tospamtrap;
  $subject = '[Spamverdacht] ' . $subject;
}

$message = '';
if (!empty($post_msg)) {
  $message .=   $post_msg . "\r\n";
}
if (!empty($post_name)) {
  $message .= "\r\n";
  $message .= 'Name: ' .  $post_name . "\r\n";
}
if (!empty($post_emailfon)) {
  $message .= "\r\n";
  $message .= 'Kontakt: ' .  $post_emailfon . "\r\n";
}

if ($config_verbose) {
  $message .= "\r\n";
  $message .= "---\r\n";
  $message .= "\r\n";
  if (!empty($post_referrer)) {
    $message .= "Referrer: " . $post_referrer . "\r\n";
  }
  $message .= filter_var($_SERVER['HTTP_USER_AGENT'], FILTER_SANITIZE_STRING);
  $message .= $remote_addr;
  $message .= "\r\n";
}

if (!empty($message) && !$suspectedSpam) {
  $headers = 'MIME-Version: 1.0' . "\r\n".
    'Content-Type: text/plain; charset=UTF-8' . "\r\n".
    'From: ' . $config_from . "\r\n".
    'X-Mailer: openmindculture'. "\r\n".
    $config_custheader;

  mail($to, $subject, $message, $headers);
}
$message .= "\r\n";
