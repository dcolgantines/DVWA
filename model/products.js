<?php
```php
if( isset( $_POST[ 'Submit' ]  ) ) {
	// Get input
	$target = $_REQUEST[ 'ip' ];

	// Determine OS and execute the ping command.
	if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
		// Windows
		$cmd = shell_exec( 'ping ' . escapeshellarg($target) );
	}
	else {
		// *nix
		$cmd = shell_exec( 'ping -c 4 ' . escapeshellarg($target) );
	}

	// Feedback for the end user
	$html .= "<pre>{$cmd}</pre>";
}

?>
```

Explanation:

The `escapeshellarg()` function is used to escape any special characters in the command argument, making it safe to use with `shell_exec()`. By using `escapeshellarg()` on the user-controlled `$target` input, we prevent any potential command injection attacks.
