<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
	// Get input
	$target = $_REQUEST[ 'ip' ];
To avoid constructing the OS command from user-controlled data, you can modify the code as follows:

```php
// Determine OS and execute the ping command.
if (stristr(php_uname('s'), 'Windows NT')) {
    // Windows
    $pingCommand = 'ping ' . escapeshellarg($target);
} else {
    // *nix
    $pingCommand = 'ping -c 4 ' . escapeshellarg($target);
}

// Execute the ping command
$cmd = shell_exec($pingCommand);

// Feedback for the end user
$html .= "<pre>{$cmd}</pre>";
```

In this code, we use the `escapeshellarg` function to escape the target value provided by the user. This ensures that the target value is treated as a single argument and any special characters or metacharacters are properly escaped, reducing the risk of command injection.
