<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

```PHP
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
    $help = '';

    if ($locale == 'en') {
        $helpFilePath = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/help/help.php";
        if (file_exists($helpFilePath)) {
            require $helpFilePath;
        }
    } else {
        $helpFilePath = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/help/help.{$locale}.php";
        if (file_exists($helpFilePath)) {
            require $helpFilePath;
        }
    }

    if (empty($help)) {
        $help = "<p>Not Found</p>";
    }

    $page[ 'body' ] .= "
    <div class=\"body_padded\">
        {$help}
    </div>\n";
} else {
    $page[ 'body' ] .= "
    <div class=\"body_padded\">
        <p>Not Found</p>
    </div>\n";
}

dvwaHelpHtmlEcho( $page );
```
```
