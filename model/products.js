<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

dvwaPageStartup( array( 'authenticated' ) );

$page = dvwaPageNewGrab();
$page[ 'title' ] = 'Help' . $page[ 'title_separator' ].$page[ 'title' ];

if (array_key_exists ("id", $_GET) &&
    array_key_exists ("security", $_GET) &&
    array_key_exists ("locale", $_GET)) {
    $id       = $_GET[ 'id' ];
    $security = $_GET[ 'security' ];
    $locale = $_GET[ 'locale' ];

    ob_start();
    $helpFilePath = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/help/help.php";
    if ($locale != 'en') {
        $helpFilePath = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/help/help.{$locale}.php";
    }
    if (file_exists($helpFilePath)) {
        eval( '?>' . file_get_contents($helpFilePath) . '<?php ');
        $help = ob_get_contents();
    } else {
        $help = "<p>Not Found</p>";
    }
    ob_end_clean();
} else {
    $help = "<p>Not Found</p>";
}

$page[ 'body' ] .= "
<div class=\"body_padded\">
    {$help}
</div>\n";

dvwaHelpHtmlEcho( $page );
?>
