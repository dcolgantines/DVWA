<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
	// Get input
	$target = $_REQUEST[ 'ip' ];
To avoid constructing the OS command from user-controlled data, you can sanitize the target input and use command-line arguments instead. Here's the updated code:

```php
// Sanitize the target input
$target = escapeshellarg($target);

// Determine OS and execute the ping command.
if (stristr(php_uname('s'), 'Windows NT')) {
    // Windows
    $cmd = shell_exec("ping {$target}");
} else {
    // *nix
    $cmd = shell_exec("ping -c 4 {$target}");
}

// Feedback for the end user
$html .= "<pre>{$cmd}</pre>";
```

In this code, `escapeshellarg()` is used to escape and sanitize the `$target` input before using it in the shell command. This helps prevent command injection attacks by ensuring that any malicious characters are properly escaped.
