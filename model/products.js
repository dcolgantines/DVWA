<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```php
if (strpos($_GET['redirect'], "info.php") !== false) {
    $redirectUrl = $_GET['redirect'];
    
    if (filter_var($redirectUrl, FILTER_VALIDATE_URL)) {
        header("location: " . $redirectUrl);
        exit;
    } else {
        http_response_code(500);
        ?>
        <p>Invalid redirect URL.</p>
        <?php
        exit;
    }
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

By using the `filter_var()` function with the `FILTER_VALIDATE_URL` flag, we can validate the redirect URL provided by the user. This helps to ensure that only valid URLs are used for redirection.
