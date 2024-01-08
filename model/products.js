<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```php
if (isset($_GET['redirect'])) {
   $redirect = filter_var($_GET['redirect'], FILTER_SANITIZE_URL);
   
   if (filter_var($redirect, FILTER_VALIDATE_URL)) {
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

Explanation:
- First, we use `filter_var` with the `FILTER_SANITIZE_URL` filter to sanitize the redirect URL provided through `$_GET['redirect']`. This will remove any potentially malicious characters or tags.
- Then, we use `filter_var` with the `FILTER_VALIDATE_URL` filter to validate that the sanitized URL is a valid URL.
- If the URL passes both the sanitization and validation checks, we can safely perform the redirect using `header("location: " . $redirect)`.
- If the redirect URL is not provided or fails the checks, we set the HTTP response code to 500 and display a message indicating the missing redirect target.
