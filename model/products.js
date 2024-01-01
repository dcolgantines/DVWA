<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```php
if (isset($_GET['redirect']) && $_GET['redirect'] === "info.php") {
    header("location: info.php");
    exit;
} else {
    http_response_code(500);
    ?>
    <p>You can only redirect to the info page.</p>
    <?php
    exit;
}

http_response_code(500);
?>
<p>Missing redirect target.</p>
<?php
exit;
```

Explanation: 
In the original code, the `strpos()` function is used to check if the string "info.php" is present in the `$_GET['redirect']` value. However, this approach is not secure as it could be bypassed by adding additional characters or using different encodings.
To fix this vulnerability, we should directly compare the `$_GET['redirect']` value with the expected value "info.php" using the `===` operator. This ensures an exact match and eliminates the possibility of bypassing the redirect.
