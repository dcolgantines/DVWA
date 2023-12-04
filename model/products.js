<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
	// Get input
	$target = $_REQUEST[ 'ip' ];
```
// Determine OS and execute the ping command.
if (stristr(php_uname('s'), 'Windows NT')) {
    // Windows
    $cmd = 'ping ' . escapeshellarg($target);
} else {
    // *nix
    $cmd = 'ping -c 4 ' . escapeshellarg($target);
}

// Execute the command
$result = shell_exec($cmd);

// Feedback for the end user
$html .= "<pre>{$result}</pre>";
```
