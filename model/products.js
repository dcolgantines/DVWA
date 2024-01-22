<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
	// Get input
	$target = $_REQUEST[ 'ip' ];
```php
// Determine OS and execute the ping command.
if (stristr(php_uname('s'), 'Windows NT')) {
    // Windows
    $cmd = shell_exec('ping ' . escapeshellarg($target));
} else {
    // *nix
    $cmd = shell_exec('ping -c 4 ' . escapeshellarg($target));
}

// Feedback for the end user
$html .= "<pre>{$cmd}</pre>";
```

The code has been modified to use the `escapeshellarg()` function to escape the user-controlled data before constructing the command. This helps prevent command injection attacks by ensuring that the command argument passed to `shell_exec()` is properly formatted and sanitized.
