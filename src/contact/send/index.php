<?php
declare(strict_types=1);

// Load dependencies
require_once __DIR__ . '/SpamDetector.php';
require_once __DIR__ . '/spam-rules.php';

// For non-composer installs:
// require_once __DIR__ . '/phpmailer/src/PHPMailer.php';
// require_once __DIR__ . '/phpmailer/src/SMTP.php';
// require_once __DIR__ . '/phpmailer/src/Exception.php';

// With composer (add to composer.json)
// TODO how to deploy this properly or does the provider provide PHPMailer out of the box
require_once __DIR__ . '/../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Cache-Control: no-store');
header('Pragma: no-cache');
header('X-Powered-By: openmindculture');

// === CONFIGURATION (use .env in production) ===
$config = [
  'from' => $_ENV['CONTACT_FROM'] ?? 'contact@ingo-steinke.com',
  'to' => $_ENV['CONTACT_TO'] ?? 'contact@ingo-steinke.com',
  'spam_to' => $_ENV['CONTACT_SPAM_TO'] ?? 'contact@ingo-steinke.com',
  'subject' => 'Contactform from ISD website',
  'verbose' => true,
];

// === INPUT VALIDATION (NOT SANITIZATION) ===
$request = $_POST ?? [];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  exit(json_encode(['status' => '405 Method Not Allowed']));
}

$post_name = $request['contactform-field-name'] ?? '';
$post_email = $request['contactform-field-emailfon'] ?? '';
$post_message = $request['contactform-field-message'] ?? '';
$post_referrer = $_SERVER['HTTP_REFERER'] ?? '';
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';

// Trim but do NOT sanitize (we'll validate instead)
$post_name = trim($post_name);
$post_email = trim($post_email);
$post_message = trim($post_message);

// === SPAM DETECTION ===
$rules = include __DIR__ . '/spam-rules.php';
$detector = new SpamDetector($rules);
$is_spam = $detector->isSpam(
  $post_name,
  $post_email,
  $post_message,
  $user_agent,
  $request
);

// === RESPONSE LOGIC ===
$is_ajax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&
  strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';

if ($is_spam) {
  $status_code = 403;
  $status_text = '403 Forbidden';
  $response_body = ['status' => $status_text, 'message' => 'Request rejected'];
} elseif (empty($post_name) || empty($post_email) || empty($post_message)) {
  $status_code = 400;
  $status_text = '400 Bad Request';
  $response_body = ['status' => $status_text, 'message' => 'Missing required fields'];
} else {
  $status_code = 200;
  $status_text = '200 OK';
  $response_body = ['status' => $status_text, 'message' => 'Message received'];
}

// Send response
if ($is_ajax) {
  header('Content-Type: application/json');
  http_response_code($status_code);
  echo json_encode($response_body);
} else {
  header('Content-Type: text/html; charset=UTF-8');
  if ($status_code === 200) {
    header('Refresh: 3; url=https://www.ingo-steinke.de/');
    echo '<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Danke</title></head>';
    echo '<body><h1>Danke für deine Nachricht!</h1><p>Du wirst in 3 Sekunden weitergeleitet...</p></body></html>';
  } else {
    http_response_code($status_code);
    echo '<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Fehler</title></head>';
    echo '<body><h1>' . htmlspecialchars($status_text) . '</h1><p>Deine Anfrage konnte nicht verarbeitet werden.</p></body></html>';
  }
}

// === SEND EMAIL (only if not spam and valid) ===
if (!$is_spam && $status_code === 200) {
  sendEmail(
    $post_email,
    $post_name,
    $post_message,
    $post_referrer,
    $user_agent,
    $config,
    false
  );
} elseif ($is_spam) {
  // Log spam to admin (optional)
  sendEmail(
    $config['spam_to'],
    'Spam Report: ' . $post_name,
    $post_message,
    $post_referrer,
    $user_agent,
    $config,
    true
  );
}

exit;

// === MAILER FUNCTION ===
function sendEmail(
  string $reply_to,
  string $name,
  string $message,
  string $referrer,
  string $user_agent,
  array $config,
  bool $is_spam_report
): void {
  try {
    $mail = new PHPMailer(true);

    // Use local sendmail or SMTP
    // For local dev: use sendmail
    $mail->isSendmail();

    // Set headers safely (no injection possible)
    $mail->setFrom($config['from'], 'Ingo Steinke Website');
    $mail->addAddress(
      $is_spam_report ? $config['spam_to'] : $config['to'],
      'Contact'
    );
    $mail->addReplyTo($reply_to, $name);

    // Subject
    $subject = $is_spam_report
      ? '[SPAM] ' . $config['subject']
      : $config['subject'];
    $mail->Subject = $subject;

    // Body
    $body = $message . "\r\n\r\n";
    if ($config['verbose']) {
      $body .= "---\r\n";
      $body .= "Name: " . $name . "\r\n";
      $body .= "Email: " . $reply_to . "\r\n";
      $body .= "Referrer: " . $referrer . "\r\n";
      $body .= "User-Agent: " . $user_agent . "\r\n";
    }

    $mail->Body = $body;
    $mail->isHTML(false);
    $mail->CharSet = 'UTF-8';

    $mail->send();

  } catch (Exception $e) {
    // Log error, don't expose to user
    error_log('PHPMailer Error: ' . $e->getMessage());
  }
}

