<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
To avoid performing redirects based on user-controlled data, we need to implement proper input validation. Here's the updated code snippet:

```php
<?php
if (isset($_GET['redirect']) && isValidRedirect($_GET['redirect'])) {
    header("Location: " . $_GET['redirect']);
    exit;
}

http_response_code(500);
?>
<p>Missing redirect target.</p>
<?php
exit;
?>

<?php
function isValidRedirect($redirect) {
    // Add your validation logic here to check if the redirect is a valid URL or a whitelisted value
    // Return true if valid, false otherwise
    return filter_var($redirect, FILTER_VALIDATE_URL);
}
?>
```

In the code snippet above, we have introduced a custom `isValidRedirect()` function that performs input validation on the `$_GET['redirect']` value. You can modify this function to implement your specific validation logic. In the example provided, `filter_var()` is used to validate the URL format. If the redirect is valid, the code proceeds with the redirection; otherwise, it returns a 500 HTTP response code and displays an error message.
