<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
	// Get input
	$target = $_REQUEST[ 'ip' ];
To avoid constructing the OS command from user-controlled data, you can use the `escapeshellarg()` function to properly escape the `$target` variable before concatenating it with the command string. Here's the updated code:

```php
<?php

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

?>
```

By using `escapeshellarg()`, the user-controlled data in the `$target` variable will be properly escaped, preventing any malicious commands from being executed.
