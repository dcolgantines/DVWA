<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```php
if (!empty($_GET['redirect'])) {
    $redirect = $_GET['redirect'];

    // Validate the redirect URL to ensure it starts with http:// or https://
    if (strpos($redirect, 'http://') === 0 || strpos($redirect, 'https://') === 0) {
        header("Location: " . $redirect);
        exit;
    }
}

http_response_code(500);
?>
<p>Missing redirect target.</p>
<?php
exit;
?>
```

Explanation:

Instead of directly using the user-controlled data `$_GET['redirect']` in the `header("location: " . $_GET['redirect'])` line, we first validate the input to ensure that it starts with `http://` or `https://`. This helps to prevent an attacker from performing open redirects by injecting malicious URLs into the `redirect` parameter.

By adding the validation step, we reduce the risk of redirecting users to untrusted or potentially malicious websites.
