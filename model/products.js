<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

dvwaPageStartup( array( 'authenticated' ) );
$page = dvwaPageNewGrab();
$page[ 'title' ] = 'Source' . $page[ 'title_separator' ].$page[ 'title' ];

if (array_key_exists ("id", $_GET)) {
	$id = $_GET[ 'id' ];

	switch ($id) {
		case "javascript" :
			$vuln = 'JavaScript';
			$lowsrc = ''; // Set to empty string to prevent constructing file path from user-controlled data
			$medsrc = '';
			$highsrc = '';
			$impsrc = '';
			break;
		case "fi" :
			$vuln = 'File Inclusion';
			$lowsrc = '';
			$medsrc = '';
			$highsrc = '';
			$impsrc = '';
			break;
		case "brute" :
			$vuln = 'Brute Force';
			$lowsrc = '';
			$medsrc = '';
			$highsrc = '';
			$impsrc = '';
			break;
		case "csrf" :
			$vuln = 'CSRF';
			$lowsrc = '';
			$medsrc = '';
			$highsrc = '';
			$impsrc = '';
			break;
		case "exec" :
			$vuln = 'Command Injection';
			$lowsrc = '';
			$medsrc = '';
			$highsrc = '';
			$impsrc = '';
			break;
		case "sqli" :
			$vuln = 'SQL Injection';
			$lowsrc = '';
			$medsrc = '';
			$highsrc = '';
			$impsrc = '';
			break;
		case "sqli_blind" :
			$vuln = 'SQL Injection (Blind)';
			$lowsrc = '';
			$medsrc = '';
			$highsrc = '';
			$impsrc = '';
			break;
		case "upload" :
			$vuln = 'File Upload';
			$lowsrc = '';
			$medsrc = '';
			$highsrc = '';
			$impsrc = '';
			break;
		case "xss_r" :
			$vuln = 'Reflected XSS';
			$lowsrc = '';
			$medsrc = '';
			$highsrc = '';
			$impsrc = '';
			break;
		case "xss_s" :
			$vuln = 'Stored XSS';
			$lowsrc = '';
			$medsrc = '';
			$highsrc = '';
			$impsrc = '';
			break;
		case "weak_id" :
			$vuln = 'Weak Session IDs';
			$lowsrc = '';
			$medsrc = '';
			$highsrc = '';
			$impsrc = '';
			break;
		case "authbypass" :
			$vuln = '';
			$lowsrc = '';
			$medsrc = '';
			$highsrc = '';
			$impsrc = '';
			break;
		default:
			$vuln = '';
			$lowsrc = '';
			$medsrc = '';
			$highsrc = '';
			$impsrc = '';
			break;
	}
}
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