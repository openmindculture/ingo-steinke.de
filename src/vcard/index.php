<?php

header("Content-Type: text/x-vcard; charset=utf-8");
header("Content-Disposition: attachment; filename=\"ingo-steinke.vcf\";");
# Output file contents
if (isset($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'steinke.de') !== false) {
  echo file_get_contents("ingo-steinke-de.vcf");
} else {
  echo file_get_contents("ingo-steinke-en.vcf");
}
