<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```
if (isset($_GET['redirect'])) {
    $allowedRedirects = ['info.php'];

    $redirect = $_GET['redirect'];

    if (in_array($redirect, $allowedRedirects)) {
        header("Location: $redirect");
        exit;
    }
}

http_response_code(500);
?>
<p>You can only redirect to the info page.</p>
<?php
exit;
```
```
