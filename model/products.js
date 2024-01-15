<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

dvwaPageStartup( array( 'authenticated' ) );

$page = dvwaPageNewGrab();
$page[ 'title' ] = 'Source' . $page[ 'title_separator' ].$page[ 'title' ];

if (array_key_exists ("id", $_GET)) {
	$id = $_GET[ 'id' ];

	$lowsrc = @file_get_contents("./{$id}/source/low.php");
To avoid constructing the path from user-controlled data, you can use a whitelist of allowed values for the `$id` variable and fetch the source code based on the selected value. Here's the modified code:

```php
$allowedIds = [
    "javascript",
    "fi",
    "brute",
    "csrf",
    "exec",
    "sqli",
    "sqli_blind",
    "upload",
    "xss_r",
    "xss_s",
    "weak_id",
    "authbypass",
    "open_redirect"
];

$id = isset($_GET['id']) ? $_GET['id'] : null;

if (in_array($id, $allowedIds)) {
    $sourceCodeFilePath = "./{$id}/source/{$id}.php";
    $sourceCode = @file_get_contents($sourceCodeFilePath);
    $sourceCode = str_replace(array('$html.='), array('echo'), $sourceCode);
    $highlightedSourceCode = highlight_string($sourceCode, true);

    switch ($id) {
        case "javascript":
            $vuln = "JavaScript";
            break;
        case "fi":
            $vuln = "File Inclusion";
            break;
        case "brute":
            $vuln = "Brute Force";
            break;
        case "csrf":
            $vuln = "CSRF";
            break;
        case "exec":
            $vuln = "Command Injection";
            break;
        case "sqli":
            $vuln = "SQL Injection";
            break;
        case "sqli_blind":
            $vuln = "SQL Injection (Blind)";
            break;
        case "upload":
            $vuln = "File Upload";
            break;
        case "xss_r":
            $vuln = "Reflected XSS";
            break;
        case "xss_s":
            $vuln = "Stored XSS";
            break;
        case "weak_id":
            $vuln = "Weak Session IDs";
            break;
        case "authbypass":
            $vuln = "Authorization Bypass";
            break;
        case "open_redirect":
            $vuln = "Open HTTP Redirect";
            break;
        default:
            $vuln = "Unknown Vulnerability";
    }

    $page['body'] .= "
    <div class=\"body_padded\">
        <h1>{$vuln}</h1>
        {$highlightedSourceCode}
    </div>";
} else {
    $vuln = "Unknown Vulnerability";
    $page['body'] .= "
    <div class=\"body_padded\">
        <h1>{$vuln}</h1>
        <p>Invalid vulnerability ID.</p>
    </div>";
}
```

In this code, I added a whitelist array `$allowedIds` that contains all the allowed values for the `$id` variable. Then, I check if the provided `$id` is in the whitelist using `in_array()`. If it is a valid value, I construct the `$sourceCodeFilePath` based on the `$id` and fetch the source code from that path. Otherwise, I display an error message. This ensures that only allowed values can be used to fetch the source code and prevents path traversal attacks.
		<br />

		<h3>Impossible {$vuln} Source</h3>
		<table width='100%' bgcolor='white' style=\"border:2px #C0C0C0 solid\">
			<tr>
				<td><div id=\"code\">{$impsrc}</div></td>
			</tr>
		</table>
		<br />

		<h3>High {$vuln} Source</h3>
		<table width='100%' bgcolor='white' style=\"border:2px #C0C0C0 solid\">
			<tr>
				<td><div id=\"code\">{$highsrc}</div></td>
			</tr>
		</table>
		<br />

		<h3>Medium {$vuln} Source</h3>
		<table width='100%' bgcolor='white' style=\"border:2px #C0C0C0 solid\">
			<tr>
				<td><div id=\"code\">{$medsrc}</div></td>
			</tr>
		</table>
		<br />

		<h3>Low {$vuln} Source</h3>
		<table width='100%' bgcolor='white' style=\"border:2px #C0C0C0 solid\">
			<tr>
				<td><div id=\"code\">{$lowsrc}</div></td>
			</tr>
		</table>
		<br /> <br />

		<form>
			<input type=\"button\" value=\"<-- Back\" onclick=\"history.go(-1);return true;\">
		</form>

	</div>\n";
} else {
	$page['body'] = "<p>Not found</p>";
}

dvwaSourceHtmlEcho( $page );

?>