<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

dvwaPageStartup( array( 'authenticated' ) );

$page = dvwaPageNewGrab();
$page[ 'title' ] = 'Source' . $page[ 'title_separator' ].$page[ 'title' ];

$id = $_GET[ 'id' ];
$allowed_ids = array("javascript", "fi", "brute", "csrf", "exec", "sqli", "sqli_blind", "upload", "xss_r");
if (in_array($id, $allowed_ids)) {
  
  $sources_path = "./{$id}/source/";
  
  $lowsrc = @file_get_contents($sources_path . "low.php");
  $lowsrc = str_replace( array( '$html .=' ), array( 'echo' ), $lowsrc);
  $lowsrc = highlight_string( $lowsrc, true );

  $medsrc = @file_get_contents($sources_path . "medium.php");
  $medsrc = str_replace( array( '$html .=' ), array( 'echo' ), $medsrc);
  $medsrc = highlight_string( $medsrc, true );

  $highsrc = @file_get_contents($sources_path . "high.php");
  $highsrc = str_replace( array( '$html .=' ), array( 'echo' ), $highsrc);
  $highsrc = highlight_string( $highsrc, true );

  $impsrc = @file_get_contents($sources_path . "impossible.php");
  $impsrc = str_replace( array( '$html .=' ), array( 'echo' ), $impsrc);
  $impsrc = highlight_string( $impsrc, true );

  switch ($id) {
    case "javascript" :
      $vuln = 'JavaScript';
      break;
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
    
    default:
      $vuln = '';
  }
}

The change is to add an array `$allowed_ids` that contains the list of valid `id` values. Then, we use `in_array` to check if the provided `id` is in the list of allowed ids before proceeding with the file operations. This prevents the construction of the path from user-controlled data and restricts the allowed values.
		case "xss_s" :
			$vuln = 'Stored XSS';
			break;
		case "weak_id" :
			$vuln = 'Weak Session IDs';
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