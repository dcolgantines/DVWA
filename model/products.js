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
To fix the security vulnerability of constructing the path from user-controlled data, you can use a whitelist approach to validate the input. Modify the code snippet as follows:

```php
switch ($security) {
    case "exec" :
        $vuln = 'Command Injection';
        break;
    case "sql" :
        $vuln = 'SQL Injection';
        break;
    case "xss_r" :
        $vuln = 'Reflected Cross Site Scripting (XSS)';
        break;
    case "xss_s" :
        $vuln = 'Stored Cross Site Scripting (XSS)';
        break;
    case "csrf" :
        $vuln = 'CSRF';
        break;
    case "file_upload" :
        $vuln = 'File Inclusion';
        break;
    case "authbypass" :
        $vuln = 'Authorisation Bypass';
        break;
    case "open_redirect" :
        $vuln = 'Open HTTP Redirect';
        break;
    default:
        $vuln = "Unknown Vulnerability";
}

$allowedSecurity = array("exec", "sql", "xss_r", "xss_s", "csrf", "file_upload", "authbypass", "open_redirect");
if (!in_array($security, $allowedSecurity)) {
    $vuln = "Unknown Vulnerability";
    $security = "unknown";
}

$sourcePath = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/source/{$security}.php";
$source = @file_get_contents($sourcePath);
$source = str_replace(array('$html .='), array('echo'), $source);

$js_html = "";
$jsPath = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/source/{$security}.js";
if (file_exists($jsPath)) {
    $js_source = @file_get_contents($jsPath);
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

$page['body'] = "<p>Not found</p>";

if (!empty($source)) {
    $page['body'] = "
    <div class=\"body_padded\">
        <h1>{$vuln} Source</h1>

        <h2>vulnerabilities/{$id}/source/{$security}.php</h2>
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

In the updated code, we added an array called `$allowedSecurity` which contains all the allowed values for the `$security` variable. We then check whether the value of `$security` is present in the `$allowedSecurity` array using the `in_array` function. If it is not present, we set `$vuln` to "Unknown Vulnerability" and `$security` to "unknown". This way, the path construction is no longer directly based on user-controlled data, preventing path traversal vulnerabilities.

Please note that you should also take other security measures, such as input validation and output encoding, to further secure your application.
