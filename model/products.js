<?php
To avoid constructing the OS command from user-controlled data, you can use the `escapeshellarg` function to properly escape the command argument.

Here's the updated code:

```php
if (isset($_POST['Submit'])) {
    // Get input
    $target = $_REQUEST['ip'];

    // Determine OS and execute the ping command.
    if (stristr(php_uname('s'), 'Windows NT')) {
        // Windows
        $cmd = 'ping ' . escapeshellarg($target);
    } else {
        // *nix
        $cmd = 'ping -c 4 ' . escapeshellarg($target);
    }

    // Execute the command
    $output = shell_exec($cmd);

    // Feedback for the end user
    $html .= "<pre>{$output}</pre>";
}
```

By using `escapeshellarg`, the user-controlled data is properly escaped, ensuring that it is treated as a single command argument and not allowing any potential command injection vulnerabilities.
