<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

$dvwaPageStartup = ['authenticated'];

$page = dvwaPageNewGrab();
$page['title'] = 'Help' . $page['title_separator'] . $page['title'];

if (array_key_exists("id", $_GET) &&
    array_key_exists("security", $_GET) &&
    array_key_exists("locale", $_GET)
) {
    $id = $_GET['id'];
    $security = $_GET['security'];
    $locale = $_GET['locale'];

    ob_start();

    $helpPath = __DIR__ . "/vulnerabilities/{$id}/help/help.php";
    if ($locale == 'en') {
        if (realpath($helpPath)) {
            eval(file_get_contents($helpPath));
        } else {
            echo "Not Found";
        }
    } else {
        $helpLocalePath = __DIR__ . "/vulnerabilities/{$id}/help/help.{$locale}.php";
        if (realpath($helpLocalePath)) {
            eval(file_get_contents($helpLocalePath));
        } else {
            echo "Not Found";
        }
    }
    $help = ob_get_contents();
    ob_end_clean();
} else {
    $help = "<p>Not Found</p>";
}

$page['body'] .= "
<div class=\"body_padded\">
   {$help}
</div>\n";

dvwaHelpHtmlEcho($page);

?>
