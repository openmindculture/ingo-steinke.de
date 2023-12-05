<?php

$filenamePrefix= 'ingo-steinke-en';
$isClientIOS = stripos($_SERVER['HTTP_USER_AGENT'],"iPhone");

if (isset($_SERVER['HTTP_HOST']) && stripos($_SERVER['HTTP_HOST'], 'steinke.de') !== false) {
    $filenamePrefix = 'ingo-steinke-de';
}

if (!$isClientIOS) {
    header('Content-Type: text/x-vcard; charset=utf-8');
    header('Content-Disposition: attachment; filename="ingo-steinke.vcf";');
    echo file_get_contents($filenamePrefix . '.vcf');
    exit();
}

header('Content-Type: text/calendar; charset=utf-8');
header('X-APPLE-FILENAME=ingo-steinke.ics');
header('Content-Disposition: attachment; filename=\"ingo-steinke.ics";');
echo file_get_contents($filenamePrefix . '.ics');
