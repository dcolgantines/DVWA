<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

dvwaPageStartup( array( 'authenticated' ) );

$page = dvwaPageNewGrab();
$page[ 'title' ] = 'Source' . $page[ 'title_separator' ].$page[ 'title' ];

if (array_key_exists ("id", $_GET)) {
	$id = $_GET[ 'id' ];

	$lowsrc = @file_get_contents("./{$id}/source/low.php");
To avoid constructing the path from user-controlled data, you can use a switch-case statement instead of directly concatenating the user-input `$id` to the path string. Here's the modified code:

```php
$lowsrc = str_replace(array('$html .='), array('echo'), $lowsrc);
$lowsrc = highlight_string($lowsrc, true);

$medsrc = @file_get_contents(getFilePath($id, 'medium.php'));
$medsrc = str_replace(array('$html .='), array('echo'), $medsrc);
$medsrc = highlight_string($medsrc, true);

$highsrc = @file_get_contents(getFilePath($id, 'high.php'));
$highsrc = str_replace(array('$html .='), array('echo'), $highsrc);
$highsrc = highlight_string($highsrc, true);

$impsrc = @file_get_contents(getFilePath($id, 'impossible.php'));
$impsrc = str_replace(array('$html .='), array('echo'), $impsrc);
$impsrc = highlight_string($impsrc, true);

$vuln = getVulnerabilityName($id);

$page['body'] .= "
<div class=\"body_padded\">
    <h1>{$vuln}</h1>
";

// Function to get the file path based on $id
function getFilePath($id, $filename)
{
    switch ($id) {
        case 'javascript':
            return "./javascript/source/{$filename}";
        case 'fi':
            return "./fi/source/{$filename}";
        case 'brute':
            return "./brute/source/{$filename}";
        case 'csrf':
            return "./csrf/source/{$filename}";
        case 'exec':
            return "./exec/source/{$filename}";
        case 'sqli':
            return "./sqli/source/{$filename}";
        case 'sqli_blind':
            return "./sqli_blind/source/{$filename}";
        case 'upload':
            return "./upload/source/{$filename}";
        case 'xss_r':
            return "./xss_r/source/{$filename}";
        case 'xss_s':
            return "./xss_s/source/{$filename}";
        case 'weak_id':
            return "./weak_id/source/{$filename}";
        case 'authbypass':
            return "./authbypass/source/{$filename}";
        case 'open_redirect':
            return "./open_redirect/source/{$filename}";
        default:
            return "./unknown/source/{$filename}";
    }
}

// Function to get the vulnerability name based on $id
function getVulnerabilityName($id)
{
    switch ($id) {
        case 'javascript':
            return 'JavaScript';
        case 'fi':
            return 'File Inclusion';
        case 'brute':
            return 'Brute Force';
        case 'csrf':
            return 'CSRF';
        case 'exec':
            return 'Command Injection';
        case 'sqli':
            return 'SQL Injection';
        case 'sqli_blind':
            return 'SQL Injection (Blind)';
        case 'upload':
            return 'File Upload';
        case 'xss_r':
            return 'Reflected XSS';
        case 'xss_s':
            return 'Stored XSS';
        case 'weak_id':
            return 'Weak Session IDs';
        case 'authbypass':
            return 'Authorization Bypass';
        case 'open_redirect':
            return 'Open HTTP Redirect';
        default:
            return 'Unknown Vulnerability';
    }
}
```

In this solution, the `getFilePath()` function returns the file path based on the `$id` input, and the `getVulnerabilityName()` function returns the vulnerability name based on the `$id` input. By using these helper functions and the switch-case statement, the code no longer constructs the path directly from user input, making it more secure.
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