<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```php
if (isset($_GET['redirect'])) {
    $allowedRedirects = [
        "info.php"
    ];
    
    $redirect = $_GET['redirect'];
    
    if (in_array($redirect, $allowedRedirects)) {
        header("location: " . $redirect);
        exit;
    } else {
        http_response_code(500);
        ?>
        <p>You can only redirect to the info page.</p>
        <?php
        exit;
    }
} else {
    http_response_code(500);
    ?>
    <p>Missing redirect target.</p>
    <?php
    exit;
}
```

Explanation:
- The code first checks if the 'redirect' parameter is set in the $_GET array using `isset()`.
- An array `$allowedRedirects` is created to store all the allowed redirect targets.
- The value of the 'redirect' parameter is stored in a variable `$redirect`.
- The code then checks if the `$redirect` value is present in the `$allowedRedirects` array using `in_array()`.
- If the redirect target is allowed, the code performs the redirect.
- If the redirect target is not allowed, the code returns a 500 error response and displays a message to inform the user that only redirection to the info page is allowed.
- If the 'redirect' parameter is not provided, the code returns a 500 error response and displays a message to inform the user that the redirect target is missing.
