<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

Change the code to use a whitelist for the `$_GET['id']` parameter to prevent directory traversal attacks. Additionally, remove the use of `eval` which is generally considered unsafe. 

```
dvwaPageStartup( array( 'authenticated' ) );

$page = dvwaPageNewGrab();
$page[ 'title' ] = 'Help' . $page[ 'title_separator' ].$page[ 'title' ];

$allowedIds = array("vuln1", "vuln2", "vuln3"); // Add allowed vulnerable IDs here

if (array_key_exists ("id", $_GET) &&
	array_key_exists ("security", $_GET) &&
	array_key_exists ("locale", $_GET)) {
	$id       = $_GET[ 'id' ];
	$security = $_GET[ 'security' ];
	$locale = $_GET[ 'locale' ];

	ob_start();
	if (in_array($id, $allowedIds)) {
		if ($locale == 'en') {
			include(DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/help/help.php");
		} else {
			include(DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/help/help.{$locale}.php");
		}
	} else {
		echo "<p>Not Found</p>";
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
```
