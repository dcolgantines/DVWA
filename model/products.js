<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

dvwaPageStartup( array( 'authenticated' ) );

$page = dvwaPageNewGrab();
$page['title'] = 'Help' . $page['title_separator'] . $page['title'];

if (array_key_exists("id", $_GET) &&
    array_key_exists("security", $_GET) &&
    array_key_exists("locale", $_GET)) {
    $id = $_GET['id'];
    $security = $_GET['security'];
    $locale = $_GET['locale'];

    ob_start();
    $filePath = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/" . basename($id) . "/help/help.php";
    if ($locale != 'en') {
        $filePath = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/" . basename($id) . "/help/help." . basename($locale) . ".php";
    }
    
    if (file_exists($filePath)) {
        include $filePath;
    } else {
        echo "<p>Not Found</p>";
    }
    
    $help = ob_get_clean();
} else {
    $help = "<p>Not Found</p>";
}

$page['body'] .= "
<div class=\"body_padded\">
    {$help}
</div>\n";

dvwaHelpHtmlEcho($page);

?>
