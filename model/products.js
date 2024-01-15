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
To avoid constructing the path from user-controlled data, you can use a switch statement instead of concatenating the variables directly into the path. Here's the modified code:

```php
switch ($security) {
    case "authbypass":
        $vuln = 'Authorisation Bypass';
        $sourcePath = "vulnerabilities/{$id}/source/authbypass.php";
        break;
    case "open_redirect":
        $vuln = 'Open HTTP Redirect';
        $sourcePath = "vulnerabilities/{$id}/source/open_redirect.php";
        break;
    default:
        $vuln = "Unknown Vulnerability";
        $sourcePath = '';
}

$source = '';
$js_html = "";
if (!empty($sourcePath) && file_exists(DVWA_WEB_PAGE_TO_ROOT . $sourcePath)) {
    $source = @file_get_contents(DVWA_WEB_PAGE_TO_ROOT . $sourcePath);
    $source = str_replace(array('$html .='), array('echo'), $source);

    $jsSourcePath = "vulnerabilities/{$id}/source/{$security}.js";
    if (file_exists(DVWA_WEB_PAGE_TO_ROOT . $jsSourcePath)) {
        $js_source = @file_get_contents(DVWA_WEB_PAGE_TO_ROOT . $jsSourcePath);
        $js_html = "
        <h2>$jsSourcePath</h2>
        <div id=\"code\">
            <table width='100%' bgcolor='white' style=\"border:2px #C0C0C0 solid\">
                <tr>
                    <td><div id=\"code\">" . highlight_string($js_source, true) . "</div></td>
                </tr>
            </table>
        </div>
        ";
    }
}

$page['body'] = "<p>Not found</p>";
if (!empty($source)) {
    $page['body'] = "
    <div class=\"body_padded\">
        <h1>{$vuln} Source</h1>

        <h2>{$sourcePath}</h2>
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
            <input type=\"button\" value=\"Compare All Levels\" onclick=\"window.location.href='view_source_all.php?id=$id'\">
        </form>
    </div>\n";
}

dvwaSourceHtmlEcho($page);
```

In the modified code, the switch statement is used to determine the correct vulnerability and construct the corresponding path. This way, the user-controlled data does not directly affect the path construction.
