<?php
```php
if (isset($_POST['Submit'])) {
    // Get input
    $target = $_REQUEST['ip'];

    // Determine OS and execute the ping command using an array to avoid command injection
    if (stristr(php_uname('s'), 'Windows NT')) {
        // Windows
        $cmd = shell_exec('ping', $target);
    } else {
        // *nix
        $cmd = shell_exec('ping', '-c', '4', $target);
    }

    // Feedback for the end user
    $html .= "<pre>{$cmd}</pre>";
}
```

In the updated code, we use an array to pass the command and its arguments separately to the `shell_exec` function, instead of concatenating them into a single string. This prevents command injection by treating each element in the array as a separate argument.
