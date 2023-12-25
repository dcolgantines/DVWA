<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
To prevent redirects based on user-controlled data, we need to validate the `redirect` parameter before using it in the `header()` function. Here's the modified code:

```php
if (isset($_GET['redirect'])) {
    $redirect = $_GET['redirect'];

    if (strpos($redirect, "info.php") !== false) {
        header("location: " . $redirect);
        exit;
    }
}

http_response_code(500);
?>
<p>You can only redirect to the info page.</p>
<?php
exit;
```

In the modified code, we validate the `redirect` parameter before using it in the `header()` function. If the `redirect` parameter contains the value "info.php", it will proceed with the redirect. Otherwise, it will return a 500 HTTP response code and display an error message.
