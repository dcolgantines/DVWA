<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```php
if (isset($_GET['redirect'])) {
    $allowedRedirects = array("info.php");
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
1. Firstly, we check if the `redirect` parameter is set using `isset()` function to avoid warnings.
2. Create an array `$allowedRedirects` that contains all allowed redirect targets. In this case, we only have `"info.php"`.
3. Assign the value of `$_GET['redirect']` to a variable `$redirect`.
4. Check if the value of `$redirect` exists in the `$allowedRedirects` array using `in_array()` function.
5. If it exists, perform the redirect using `header("location: " . $redirect)` and exit the script.
6. If it does not exist, return a 500 error code, display an error message, and exit the script.
7. If the `redirect` parameter is not provided, return a 500 error code, display a missing redirect target error message, and exit the script.
