<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

dvwaPageStartup( array( 'authenticated' ) );

```
$page = dvwaPageNewGrab();
$page[ 'title' ] = 'Help' . $page[ 'title_separator' ].$page[ 'title' ];

if (array_key_exists ("id", $_GET) &&
    array_key_exists ("security", $_GET) &&
    array_key_exists ("locale", $_GET)) {
    $id       = $_GET[ 'id' ];
    $security = $_GET[ 'security' ];
    $locale = $_GET[ 'locale' ];

    ob_start();
    $file = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/help/help.php";
    $filename = "help.php";
    $contents = file_get_contents($file);
    
    if ($locale != 'en') {
        $locale_file = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/help/help.{$locale}.php";
        if (file_exists($locale_file)) {
            $file = $locale_file;
            $filename = "help.{$locale}.php";
            $contents = file_get_contents($file);
        }
    }
    
    if (strpos($filename, "..") !== false || !preg_match('/^[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+$/i', $filename)) {
        die("Invalid filename.");
    }
    
    eval('?>' . $contents . '<?php ');
    $help = ob_get_clean();
} else {
    $help = "<p>Not Found</p>";
}

$page[ 'body' ] .= "
<div class=\"body_padded\">
    {$help}
</div>\n";

dvwaHelpHtmlEcho( $page );

?>
```
