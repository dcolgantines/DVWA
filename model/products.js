<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```
if (!isset($_GET['redirect'])) {
    http_response_code(500);
    ?>
    <p>Missing redirect target.</p>
    <?php
    exit;
}

if (strpos($_GET['redirect'], "info.php") !== false) {
    http_response_code(302);
    header("location: " . "info.php");
    exit;
} else {
    http_response_code(500);
    ?>
    <p>You can only redirect to the info page.</p>
    <?php
    exit;
}
```
