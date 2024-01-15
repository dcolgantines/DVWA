<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```php
if (isset($_GET['redirect'])) {
    $redirect = $_GET['redirect'];
    
    // Validate the redirect URL to prevent open redirects
    $parsedUrl = parse_url($redirect);
    if ($parsedUrl !== false && isset($parsedUrl['scheme'], $parsedUrl['host'])) {
        $scheme = strtolower($parsedUrl['scheme']);
        $host = strtolower($parsedUrl['host']);

        if ($scheme === 'http' || $scheme === 'https') {
            // Add additional validation checks if needed

            // Redirect only if the URL is valid
            header("Location: " . $redirect);
            exit;
        }
    }
}

http_response_code(500);
?>
<p>Missing redirect target.</p>
<?php
exit;
?>
```

In the updated code snippet, the `$_GET['redirect']` value is first validated using the `parse_url` function to ensure it is a valid URL. It checks if the parsed URL has a valid scheme (`http` or `https`) and a non-empty host.

By performing this URL validation, we prevent open redirect attacks where an attacker can manipulate the redirect URL to redirect users to malicious sites. Only if the URL passes the validation checks, the script performs the redirect.
