<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
	// Get input
	$target = $_REQUEST[ 'ip' ];
Rather than constructing the OS command from user-controlled data, we should use a secure alternative that separates the command from the parameters. In this case, we can use the `escapeshellarg()` function to sanitize the `$target` variable before incorporating it into the command.

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

By using `escapeshellarg()`, we ensure that any special characters in the `$target` variable are properly escaped before being passed to the shell command, preventing command injection vulnerabilities.
