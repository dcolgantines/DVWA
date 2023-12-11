<?php

define( 'DVWA_WEB_PAGE_TO_ROOT', '../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

dvwaPageStartup( array( 'authenticated' ) );
$page = dvwaPageNewGrab();
$page['title'] = 'Source' . $page['title_separator'] . $page['title'];

if (array_key_exists("id", $_GET)) {
    $id = $_GET['id'];

    // Sanitize the user input to ensure it only contains alphanumeric characters
    $id = preg_replace('/[^a-zA-Z0-9]/', '', $id);

    // Define a root directory where the source files are located
    $rootDir = './source/';

    // Define an array to map the id to the corresponding vulnerability
    $vulnMap = [
        'javascript' => 'JavaScript',
        'fi' => 'File Inclusion',
        'brute' => 'Brute Force',
        'csrf' => 'CSRF',
        'exec' => 'Command Injection',
        'sqli' => 'SQL Injection',
        'sqli_blind' => 'SQL Injection (Blind)',
        'upload' => 'File Upload',
        'xss_r' => 'Reflected XSS',
        'xss_s' => 'Stored XSS',
        'weak_id' => 'Weak Session IDs',
        'authbypass' => 'Authentication Bypass',
    ];

    // Check if the id exists in the vulnerability map
    if (array_key_exists($id, $vulnMap)) {
        $vuln = $vulnMap[$id];

        // Read the source file based on the sanitized id
        $lowsrc = @file_get_contents($rootDir . $id . '/low.php');
        $lowsrc = str_replace(array('$html .='), array('echo'), $lowsrc);
        $lowsrc = highlight_string($lowsrc, true);

        $medsrc = @file_get_contents($rootDir . $id . '/medium.php');
        $medsrc = str_replace(array('$html .='), array('echo'), $medsrc);
        $medsrc = highlight_string($medsrc, true);

        $highsrc = @file_get_contents($rootDir . $id . '/high.php');
        $highsrc = str_replace(array('$html .='), array('echo'), $highsrc);
        $highsrc = highlight_string($highsrc, true);

        $impsrc = @file_get_contents($rootDir . $id . '/impossible.php');
        $impsrc = str_replace(array('$html .='), array('echo'), $impsrc);
        $impsrc = highlight_string($impsrc, true);
    } else {
        // Handle invalid id
        echo "Invalid id";
        exit;
    }
} else {
    // Handle missing id parameter
    echo "Missing id parameter";
    exit;
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