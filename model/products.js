<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
To avoid performing redirects based on user-controlled data, you need to validate and sanitize the input before using it. Here's the updated code snippet:

```php
if (isset($_GET['redirect'])) {
    $redirect = filter_var($_GET['redirect'], FILTER_SANITIZE_URL);
    
    if (!empty($redirect)) {
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

In this updated code, the input from `$_GET['redirect']` is filtered and sanitized using `filter_var()` with the `FILTER_SANITIZE_URL` filter. This removes any potentially malicious characters or code from the redirect URL. Additionally, the `empty()` function is used to check if the sanitized redirect URL is empty before performing the redirect.
