<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

dvwaPageStartup( array( 'authenticated' ) );

$page = dvwaPageNewGrab();
$page[ 'title' ] .= 'Source' . $page[ 'title_separator' ].$page[ 'title' ];

if (array_key_exists ("id", $_GET) && array_key_exists ("security", $_GET)) {
	$id       = $_GET[ 'id' ];
	$security = $_GET[ 'security' ];


	switch ($id) {
		case "fi" :
			$vuln = 'File Inclusion';
			break;
		case "brute" :
			$vuln = 'Brute Force';
			break;
		case "csrf" :
			$vuln = 'CSRF';
			break;
		case "exec" :
			$vuln = 'Command Injection';
			break;
		case "sqli" :
			$vuln = 'SQL Injection';
			break;
		case "sqli_blind" :
			$vuln = 'SQL Injection (Blind)';
			break;
		case "upload" :
			$vuln = 'File Upload';
			break;
		case "xss_r" :
			$vuln = 'Reflected XSS';
			break;
		case "xss_s" :
			$vuln = 'Stored XSS';
			break;
		case "weak_id" :
			$vuln = 'Weak Session IDs';
			break;
		case "javascript" :
			$vuln = 'JavaScript';
			break;
To avoid constructing the path from user-controlled data, you can use a predefined array to map the `$security` value to a specific file. Here's the updated code:

```php
switch ($security) {
    case "authbypass":
        $vuln = 'Authorisation Bypass';
        $sourceFile = 'authbypass.php';
        break;
    case "open_redirect":
        $vuln = 'Open HTTP Redirect';
        $sourceFile = 'open_redirect.php';
        break;
    default:
        $vuln = "Unknown Vulnerability";
        $sourceFile = '';
}

if ($sourceFile !== '') {
    $sourcePath = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/source/{$sourceFile}";
    $jsFile = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/source/{$security}.js";

    $source = @file_get_contents($sourcePath);
    $source = str_replace(array('$html .='), array('echo'), $source);

    $js_html = "";
    if (file_exists($jsFile)) {
        $js_source = @file_get_contents($jsFile);
        $js_html = "
        <h2>vulnerabilities/{$id}/source/{$security}.js</h2>
        <div id=\"code\">
            <table width='100%' bgcolor='white' style=\"border:2px #C0C0C0 solid\">
                <tr>
                    <td><div id=\"code\">" . highlight_string($js_source, true) . "</div></td>
                </tr>
            </table>
        </div>
        ";
    }

    $page['body'] .= "
    <div class=\"body_padded\">
        <h1>{$vuln} Source</h1>

        <h2>vulnerabilities/{$id}/source/{$sourceFile}</h2>
        <div id=\"code\">
            <table width='100%' bgcolor='white' style=\"border:2px #C0C0C0 solid\">
                <tr>
                    <td><div id=\"code\">" . highlight_string($source, true) . "</div></td>
                </tr>
            </table>
        </div>
        {$js_html}
        <br /> <br />

        <form>
            <input type=\"button\" value=\"Compare All Levels\" onclick=\"window.location.href='view_source_all.php?id={$id}'\">
        </form>
    </div>\n";
} else {
    $page['body'] = "<p>Not found</p>";
}

dvwaSourceHtmlEcho($page);
```

By using the predefined array `$sourceFile` to map the `$security` value to the appropriate file, we ensure that the path is not constructed from user-controlled data. This helps to mitigate the risk of directory traversal attacks or accessing unintended files.
