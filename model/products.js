<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
<?php
if (isset($_GET['redirect'])) {
    $redirect = $_GET['redirect'];
    if (filter_var($redirect, FILTER_VALIDATE_URL)) {
        header("Location: " . $redirect);
        exit;
    }
}

http_response_code(500);
?>
<p>Missing redirect target.</p>
<?php
exit;
?>
