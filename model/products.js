<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

dvwaPageStartup( array( 'authenticated' ) );
$page = dvwaPageNewGrab();
$page[ 'title' ] = 'Source' . $page[ 'title_separator' ].$page[ 'title' ];

if (array_key_exists ("id", $_GET)) {
    $id = $_GET[ 'id' ];

    // Validate the ID input
    if (!preg_match('/^[a-zA-Z0-9]+$/', $id)) {
        die('Invalid ID');
    }

    $sourceDir = './sources/'; // define the source directory

    // create a mapping array to associate each ID with its corresponding file
    $sources = array(
        "javascript" => "javascript.php",
        "fi" => "file_inclusion.php",
        "brute" => "brute_force.php",
        "csrf" => "csrf.php",
        "exec" => "command_injection.php",
        "sqli" => "sql_injection.php",
        "sqli_blind" => "blind_sql_injection.php",
        "upload" => "file_upload.php",
        "xss_r" => "reflected_xss.php",
        "xss_s" => "stored_xss.php",
        "weak_id" => "weak_session_ids.php",
        "authbypass" => "auth_bypass.php"
    );

    // check if the ID exists in the mapping array
    if (isset($sources[$id])) {
        // construct the file path by appending the source directory and the file name from the mapping array
        $path = $sourceDir . $sources[$id];

        // read the source file
        $src = @file_get_contents($path);
        $src = str_replace( array( '$html .=' ), array( 'echo' ), $src);
        $src = highlight_string( $src, true );
    } else {
        die('Invalid ID');
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