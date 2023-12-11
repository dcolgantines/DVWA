<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```
if (isset($_GET['redirect'])) {
    $redirect = filter_var($_GET['redirect'], FILTER_SANITIZE_URL);
    if (filter_var($redirect, FILTER_VALIDATE_URL) !== false) {
        header("location: " . $redirect);
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
