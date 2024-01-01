<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

dvwaPageStartup( array( 'authenticated' ) );

$page = dvwaPageNewGrab();
$page[ 'title' ] = 'Source' . $page[ 'title_separator' ].$page[ 'title' ];

if (array_key_exists ("id", $_GET)) {
	$id = $_GET[ 'id' ];

	$lowsrc = @file_get_contents("./{$id}/source/low.php");
```
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
    "authbypass",
    "open_redirect"
];

$id = isset($_GET['id']) ? $_GET['id'] : "";
$vuln = in_array($id, $validIds) ? $id : "Unknown Vulnerability";

$lowsrc = str_replace( array( '$html .=' ), array( 'echo' ), $lowsrc);
$lowsrc = highlight_string( $lowsrc, true );

$medsrc = @file_get_contents("./source/medium.php");
$medsrc = str_replace( array( '$html .=' ), array( 'echo' ), $medsrc);
$medsrc = highlight_string( $medsrc, true );

$highsrc = @file_get_contents("./source/high.php");
$highsrc = str_replace( array( '$html .=' ), array( 'echo' ), $highsrc);
$highsrc = highlight_string( $highsrc, true );

$impsrc = @file_get_contents("./source/impossible.php");
$impsrc = str_replace( array( '$html .=' ), array( 'echo' ), $impsrc);
$impsrc = highlight_string( $impsrc, true );

$page[ 'body' ] .= "
<div class=\"body_padded\">
    <h1>{$vuln}</h1>
";
```
```
The code snippet now checks if the `id` parameter from the GET request is a valid vulnerability id before assigning it to the `$vuln` variable. If the `id` is not a valid vulnerability id, it falls back to "Unknown Vulnerability". This prevents arbitrary path construction from user-controlled data.
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