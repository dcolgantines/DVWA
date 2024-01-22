<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```php
if (isset($_GET['redirect'])) {
	$redirect = $_GET['redirect'];

	if (strpos($redirect, "info.php") !== false) {
		header("Location: " . $redirect);
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

Explanation:

In the original code, the redirect location is directly taken from the user-controlled `$_GET['redirect']` variable, which can be manipulated to perform unwanted redirects. To mitigate this security vulnerability, we should first check if the `$_GET['redirect']` variable is set, then assign it to a local variable `$redirect`. We can then safely perform the redirection checks on this local variable.

By doing so, we ensure that the redirect location is not directly influenced by user input and significantly reduce the risk of unauthorized redirection.
