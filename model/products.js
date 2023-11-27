<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
To avoid performing redirects based on user-controlled data, we need to validate and sanitize the `$_GET['redirect']` input before using it in the `header()` function.

Here's the patched code:

```php
$redirect = filter_var($_GET['redirect'], FILTER_SANITIZE_STRING);

if ($redirect === false) {
    http_response_code(500);
    ?>
    <p>Invalid redirect target.</p>
    <?php
    exit;
}

if (strpos($redirect, "info.php") !== false) {
    header("Location: " . $redirect);
    exit;
} else {
    http_response_code(500);
    ?>
    <p>You can only redirect to the info page.</p>
    <?php
    exit;
}
```

In the patched code, we use the `filter_var()` function with the `FILTER_SANITIZE_STRING` filter to sanitize the input value in `$redirect`. If the value is invalid, we return a 500 error response. Otherwise, we proceed with the redirect validation as before.
