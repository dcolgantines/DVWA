<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

dvwaPageStartup( array( 'authenticated' ) );
```
$page = dvwaPageNewGrab();
$page['title'] = 'Source' . $page['title_separator'] . $page['title'];

$id = "";

if (array_key_exists("id", $_GET)) {
    $id = $_GET['id'];
}

$validIds = [
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
    "authbypass"
];

if (in_array($id, $validIds)) {
    $lowsrc = @file_get_contents("./{$id}/source/low.php");
    $lowsrc = str_replace(['$html .='], ['echo'], $lowsrc);
    $lowsrc = highlight_string($lowsrc, true);

    $medsrc = @file_get_contents("./{$id}/source/medium.php");
    $medsrc = str_replace(['$html .='], ['echo'], $medsrc);
    $medsrc = highlight_string($medsrc, true);

    $highsrc = @file_get_contents("./{$id}/source/high.php");
    $highsrc = str_replace(['$html .='], ['echo'], $highsrc);
    $highsrc = highlight_string($highsrc, true);

    $impsrc = @file_get_contents("./{$id}/source/impossible.php");
    $impsrc = str_replace(['$html .='], ['echo'], $impsrc);
    $impsrc = highlight_string($impsrc, true);
}

switch ($id) {
    case "javascript":
        $vuln = 'JavaScript';
        break;
    case "fi":
        $vuln = 'File Inclusion';
        break;
    case "brute":
        $vuln = 'Brute Force';
        break;
    case "csrf":
        $vuln = 'CSRF';
        break;
    case "exec":
        $vuln = 'Command Injection';
        break;
    case "sqli":
        $vuln = 'SQL Injection';
        break;
    case "sqli_blind":
        $vuln = 'SQL Injection (Blind)';
        break;
    case "upload":
        $vuln = 'File Upload';
        break;
    case "xss_r":
        $vuln = 'Reflected XSS';
        break;
    case "xss_s":
        $vuln = 'Stored XSS';
        break;
    case "weak_id":
        $vuln = 'Weak Session IDs';
        break;
    case "authbypass":
        $vuln = 'Auth Bypass';
        break;
}
```
Explanation: 
- The user-controlled data is stored in the `$_GET['id']` variable. Instead of using this variable directly to construct the file path, we are validating the input against a list of valid IDs.
- By checking if the `$id` exists in the `$validIds` array, we ensure that only valid IDs are used to retrieve the file contents.
- If the `$id` is not found in the `$validIds` array, the code inside the `if` block is not executed, preventing any potential file inclusion vulnerabilities.
- The rest of the code remains unchanged.
			$vuln = 'Authorisation Bypass';
			break;
		case "open_redirect" :
			$vuln = 'Open HTTP Redirect';
			break;
		default:
			$vuln = "Unknown Vulnerability";
	}

	$page[ 'body' ] .= "
	<div class=\"body_padded\">
		<h1>{$vuln}</h1>
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