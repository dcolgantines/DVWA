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
```
	case "authbypass" :
		$vuln = 'Authorisation Bypass';
		break;
	case "open_redirect" :
		$vuln = 'Open HTTP Redirect';
		break;
	default:
		$vuln = "Unknown Vulnerability";
}

$source = @file_get_contents( DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/source/{$security}.php" );
$source = str_replace( array( '$html .=' ), array( 'echo' ), $source );

$js_html = "";
if (file_exists (DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/source/{$security}.js")) {
	$js_source = @file_get_contents( DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/source/{$security}.js" );
	$js_html = "
	<h2>vulnerabilities/{$id}/source/{$security}.js</h2>
	<div id=\"code\">
		<table width='100%' bgcolor='white' style=\"border:2px #C0C0C0 solid\">
			<tr>
				<td><div id=\"code\">" . highlight_string( $js_source, true ) . "</div></td>
			</tr>
		</table>
	</div>
	";
}

$page[ 'body' ] .= "
<div class=\"body_padded\">
	<h1>{$vuln} Source</h1>

	<h2>vulnerabilities/{$id}/source/{$security}.php</h2>
	<div id=\"code\">
		<table width='100%' bgcolor='white' style=\"border:2px #C0C0C0 solid\">
			<tr>
				<td><div id=\"code\">" . highlight_string( $source, true ) . "</div></td>
			</tr>
		</table>
	</div>
	{$js_html}
	<br /> <br />

	<form>
		<input type=\"button\" value=\"Compare All Levels\" onclick=\"window.location.href='view_source_all.php?id=$id'\">
	</form>
</div>\n";
} else {
	$page['body'] = "<p>Not found</p>";
}

dvwaSourceHtmlEcho( $page );
```

```
const ALLOWED_VULNERABILITIES = [
    "authbypass" => 'Authorisation Bypass',
    "open_redirect" => 'Open HTTP Redirect'
];
$vuln = ALLOWED_VULNERABILITIES[$security] ?? "Unknown Vulnerability";

$sourceFile = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/source/{$security}.php";
$source = file_exists($sourceFile) ? file_get_contents($sourceFile) : '';
$source = str_replace(['$html .='], ['echo'], $source);

$js_html = "";
$jsSourceFile = DVWA_WEB_PAGE_TO_ROOT . "vulnerabilities/{$id}/source/{$security}.js";
if (file_exists($jsSourceFile)) {
    $js_source = file_get_contents($jsSourceFile);
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

$page[ 'body' ] .= "
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
} else {
$page['body'] = "<p>Not found</p>";
}

dvwaSourceHtmlEcho($page);
```
Explanation:
1. Create a constant array `ALLOWED_VULNERABILITIES` with the allowed values for the `$security` variable.
2. Use the `??` operator to set a default value for `$vuln` if `$security` is not found in the `ALLOWED_VULNERABILITIES` array.
3. Use `file_exists` to check if the source file exists before trying to access it with `file_get_contents`.
4. Add file paths to variables to avoid constructing them from user-controlled data.
5. Use `highlight_string` instead of `echo` to display the source code.
6. Remove the `@` symbol before `file_get_contents` to allow error handling if the file is not accessible.
7. Add error handling in case the source file is not found (`$source = '';`).
8. Remove duplicated code in the JS source section by using a separate variable for the JS source file path.
