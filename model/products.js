<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```
if (isset($_GET['redirect'])) {
    $redirect = $_GET['redirect'];
    $redirect = filter_var($redirect, FILTER_SANITIZE_URL);
    if (filter_var($redirect, FILTER_VALIDATE_URL) !== false) {
        http_response_code(302);
        header("Location: $redirect");
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
