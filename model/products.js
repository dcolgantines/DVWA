<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```php
if (strpos($_GET['redirect'], "info.php") !== false) {
    $redirect = filter_var($_GET['redirect'], FILTER_SANITIZE_URL);
    if ($redirect === false) {
        http_response_code(400);
        echo "<p>Invalid redirect URL.</p>";
        exit;
    }
    header("location: " . $redirect);
    exit;
} else {
    http_response_code(500);
    ?>
    <p>You can only redirect to the info page.</p>
    <?php
    exit;
}
```
