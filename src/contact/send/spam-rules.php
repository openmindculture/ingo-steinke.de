<?php
/**
 * Spam detection rules extracted from original logic
 * Maintainable, centralized, easy to update
 */

return [
  'honeypot_fields' => [
    'contactform-field-captcha',
    'contactform-field-homepage',
    'contactform-field-mousemove_activity'
  ],

  'message_patterns' => [
    // Common spam keywords (multi-language)
    'Dominate YouTube',
    'top Google rankings',
    ' dominate ',
    'a promotional offer',
    'free trial of our',
    '/unsubscribe?domain',
    'Cryptocurrency',
    'Bitcoin',
    'bitcoin',
    'cannabis',
    'casino ',
    'Casino ',
    // ... (remaining 200+ patterns)
  ],

  'message_regex_patterns' => [
    '/\R{3,}/',           // 3+ consecutive newlines
    '/\bsex\b/i',
    '/\bdating\b/i',
  ],

  'url_shortener_domains' => [
    'bit.ly', 't.me', 'rb.gy', 'is.gd', 'tinyurl.com', 'telegra.ph'
  ],

  'suspicious_tlds' => [
    '.cz', '.gy', '.ly', '.ph', '.ru', '.pro', '.top', '.xyz'
  ],

  'email_patterns' => [
    'anonmails.de',
    'chinanameregistry.net',
    'resend.dev',
  ],

  'phone_prefixes' => [
    '+48',  // Poland
    '+91',  // India
  ],

  'name_patterns' => [
    'Ready for love',
    'Amandapeaceame',
    'xrumer',
  ],

  'min_message_length' => 20,  // After stripping URLs
];
