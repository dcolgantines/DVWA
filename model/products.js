<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```
if (isset($_GET['redirect'])) {
    // Validate the redirect URL to ensure it is a trusted URL or within a whitelist of safe URLs
    $safeUrls = ['example.com', 'trustedurl.com'];

    $redirectUrl = $_GET['redirect'];
    $parsedUrl = parse_url($redirectUrl);

    if (isset($parsedUrl['host']) && in_array($parsedUrl['host'], $safeUrls)) {
        header("Location: " . $redirectUrl);
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
