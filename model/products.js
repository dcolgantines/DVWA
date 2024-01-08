<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

dvwaPageStartup( array( 'authenticated' ) );

// Construct the path from user-controlled data

$page = dvwaPageNewGrab();
$page[ 'title' ] = 'Help' . $page[ 'title_separator' ].$page[ 'title' ];

if (array_key_exists ("id", $_GET) &&
	array_key_exists ("security", $_GET) &&
	array_key_exists ("locale", $_GET)) {
	$id       = (string) $_GET[ 'id' ];
	$security = (string) $_GET[ 'security' ];
	$locale = (string) $_GET[ 'locale' ];

	// Validate user input
	if (preg_match('/^\w+$/', $id) && preg_match('/^\w+$/', $security) && preg_match('/^\w+$/', $locale)) {
		ob_start();
		// Use a whitelist of allowed locales
		$allowedLocales = ['en', 'fr', 'es']; // Add more allowed locales if needed
		if (in_array($locale, $allowedLocales)) {
			// Use a whitelist of allowed files
			$filePath = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/help/help.{$locale}.php";
			if (file_exists($filePath)) {
				eval( '?>' . file_get_contents($filePath) . '<?php ' );
			} else {
				$help = "<p>Not Found</p>";
			}
		} else {
			$help = "<p>Not Found</p>";
		}
		$help = ob_get_contents();
		ob_end_clean();
	} else {
		$help = "<p>Not Found</p>";
	}
} else {
	$help = "<p>Not Found</p>";
}

$page[ 'body' ] .= "
<div class=\"body_padded\">
	{$help}
</div>\n";

dvwaHelpHtmlEcho( $page );

?>
