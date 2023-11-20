<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
	// Get input
	$target = $_REQUEST[ 'ip' ];
To avoid constructing the OS command from user-controlled data, you can use the `escapeshellarg()` function to escape the `$target` variable before passing it to the shell command. Here's the updated code snippet:

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
