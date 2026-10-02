<?php

class SpamDetector {
  private array $rules;

  public function __construct(array $rules) {
    $this->rules = $rules;
  }

  public function isSpam(
    string $name,
    string $email,
    string $message,
    string $userAgent,
    array $honeypotFields
  ): bool {
    // Check honeypots (must be empty)
    foreach ($this->rules['honeypot_fields'] as $field) {
      if (!empty($honeypotFields[$field] ?? null)) {
        return true;
      }
    }

    if ($this->isMessageSpam($message)) {
      return true;
    }

    if ($this->isEmailSpam($email)) {
      return true;
    }

    if ($this->isNameSpam($name)) {
      return true;
    }

    if (str_contains($userAgent, 'MSIE')) {
      return true;
    }

    return false;
  }

  private function isMessageSpam(string $message): bool {
    // Check exact phrase matches (case-sensitive for now)
    foreach ($this->rules['message_patterns'] as $pattern) {
      if (str_contains($message, $pattern)) {
        return true;
      }
    }

    // Check regex patterns
    foreach ($this->rules['message_regex_patterns'] as $regex) {
      if (preg_match($regex, $message)) {
        return true;
      }
    }

    // Check for URL shorteners
    foreach ($this->rules['url_shortener_domains'] as $domain) {
      if (str_contains($message, $domain)) {
        return true;
      }
    }

    // Check for suspicious TLDs in URLs
    if (preg_match('/https?:\/\S+/', $message, $matches)) {
      foreach ($this->rules['suspicious_tlds'] as $tld) {
        if (str_contains($matches[0], $tld)) {
          return true;
        }
      }
    }

    // Check minimum message length (after stripping URLs)
    $linkless = preg_replace("#https?://\S+#i", '', $message);
    $linkless = str_replace(["\r", "\n"], '', $linkless);
    if (mb_strlen($linkless) < $this->rules['min_message_length']) {
      return true;
    }

    return false;
  }

  private function isEmailSpam(string $email): bool {
    foreach ($this->rules['email_patterns'] as $pattern) {
      if (str_contains($email, $pattern)) {
        return true;
      }
    }

    foreach ($this->rules['phone_prefixes'] as $prefix) {
      if (str_contains($email, $prefix)) {
        return true;
      }
    }

    if (str_ends_with($email, '.ru') || str_ends_with($email, '.xyz')) {
      return true;
    }

    return false;
  }

  private function isNameSpam(string $name): bool {
    foreach ($this->rules['name_patterns'] as $pattern) {
      if (str_contains($name, $pattern)) {
        return true;
      }
    }

    if (str_contains($name, 'www.')) {
      return true;
    }

    return false;
  }
}
