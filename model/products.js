<?php
```php
if (isset($_POST['Submit'])) {
    // Get input
    $target = $_REQUEST['ip'];

    // Determine OS and execute the ping command using command-line arguments instead of concatenating user-controlled data
    if (stristr(php_uname('s'), 'Windows NT')) {
        // Windows
        $cmd = shell_exec('ping ' . escapeshellarg($target));
    } else {
        // *nix
        $cmd = shell_exec('ping -c 4 ' . escapeshellarg($target));
    }

    // Feedback for the end user
    $html .= "<pre>{$cmd}</pre>";
}
```
```
By using the `escapeshellarg()` function to escape the user-controlled data, we can prevent command injection. This function adds quotes around the user input and escapes special characters, ensuring that the input is treated as a single argument and cannot be interpreted as command injection.
