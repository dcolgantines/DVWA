<?php
Here's the modified code that avoids constructing the OS command from user-controlled data:

```php
if (isset($_POST['Submit'])) {
    // Get input
    $target = $_REQUEST['ip'];

    // Determine OS and execute the ping command.
    if (stristr(php_uname('s'), 'Windows NT')) {
        // Windows
        $cmd = escapeshellcmd('ping ' . $target);
    } else {
        // *nix
        $cmd = escapeshellcmd('ping -c 4 ' . $target);
    }

    // Execute the command
    $output = shell_exec($cmd);

    // Feedback for the end user
    $html .= "<pre>{$output}</pre>";
}
```

In the modified code snippet, we use the `escapeshellcmd` function to sanitize the user-controlled input `$target` before constructing the OS command. This function escapes any shell metacharacters, ensuring that the command is treated as a single command argument rather than being interpreted as multiple commands or containing malicious code.
