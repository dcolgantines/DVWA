<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
The code below addresses the security vulnerability by validating the user-controlled data before performing the redirect:

```php
if (isset($_GET['redirect'])) {
    $validRedirects = array("info.php");

    if (in_array($_GET['redirect'], $validRedirects)) {
        header("Location: " . $_GET['redirect']);
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

In this code, we first define an array of valid redirect values. Then, we check if the `$_GET['redirect']` value exists and if it matches any value in the `$validRedirects` array. If it does, we perform the redirection. If it doesn't match any of the valid values, we display an error message and exit the script. Finally, if the `$_GET['redirect']` is not set, we show another error message.
