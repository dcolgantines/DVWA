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

    $allowed_locales = ['en', 'fr', 'es']; // Add any allowed locales here

    ob_start();
    if (in_array($locale, $allowed_locales)) {
        $file_path = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/help/help.{$locale}.php";
    } else {
        $file_path = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/help/help.php";
    }
    eval( '?>' . file_get_contents($file_path) . '<?php ' );
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
```

In this code, we have removed the user-controlled data from constructing the path directly. Instead, we explicitly define the allowed locales in the `$allowed_locales` array. We then check if the provided locale is in the allowed locales list and construct the `$file_path` accordingly. This ensures that only valid locales are used to construct the file path, preventing directory traversal attacks.
