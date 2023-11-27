<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

```
dvwaPageStartup( array( 'authenticated' ) );

$page = dvwaPageNewGrab();
$page[ 'title' ] = 'Help' . $page[ 'title_separator' ] . $page[ 'title' ];

$allowedLocales = array('en', 'fr', 'de'); // Define allowed locales

if (array_key_exists("id", $_GET) &&
    array_key_exists("security", $_GET) &&
    array_key_exists("locale", $_GET)
) {
    $id = $_GET['id'];
    $security = $_GET['security'];
    $rawLocale = $_GET['locale'];

    // Validate locale
    if (in_array($rawLocale, $allowedLocales)) {
        $locale = $rawLocale;
    } else {
        $locale = 'en'; // Fallback to default locale
    }

    ob_start();

    // Construct the file path using a safe concatenation technique
    $filePath = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/help/help";
    if ($locale !== 'en') {
        $filePath .= '.' . $locale;
    }
    $filePath .= '.php';

    if (file_exists($filePath)) {
        include $filePath;
    } else {
        echo '<p>Not Found</p>';
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
```
```
