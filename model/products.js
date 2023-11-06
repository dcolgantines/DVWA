<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
The code provided is vulnerable to an Open Redirect attack. Attackers can manipulate the `$_GET['redirect']` parameter to redirect users to malicious websites.

To remediate this vulnerability, we need to validate and sanitize the input before performing any redirection. We can use a whitelist approach to only allow redirection to specific URLs.

Here's the updated code with the security vulnerability fixed:

```php
$allowedRedirects = array(
    'info.php',
);

if (isset($_GET['redirect'])) {
    $redirect = $_GET['redirect'];
    
    // Remove leading slash to prevent directory traversal
    $redirect = ltrim($redirect, '/');
    
    // Get the filename from the provided URL
    $filename = basename($redirect);
    
    if (in_array($filename, $allowedRedirects)) {
        header("Location: " . $redirect);
        exit;
    }
}

http_response_code(500);
?>
<p>Invalid redirect target.</p>
<?php
exit;
?>
```

This code now checks if the provided redirect URL matches the whitelist of allowed redirects (`$allowedRedirects`). Before performing the redirection, it verifies that the filename extracted from the URL is present in the `$allowedRedirects` array.

If the redirect is not in the whitelist, it responds with an error message and returns a 500 HTTP response code.
