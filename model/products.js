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
    
    // sanitize user input to prevent path traversal attacks
    $id = basename($id);
    $locale = basename($locale);
    
    // use a whitelist to ensure only valid locales are allowed
    $allowedLocales = ['en', 'fr', 'es']; // add more locales as needed
    if (in_array($locale, $allowedLocales)) {
        // use sprintf to construct the path using a format string
        $path = sprintf(DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/%s/help/help.%s.php", $id, $locale);
        eval( '?>' . file_get_contents($path) . '<?php ' );
    } else {
        $help = "<p>Not Found</p>";
    }
    
    $help = ob_get_contents();
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
