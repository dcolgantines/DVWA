<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```
if (strpos($_GET['redirect'], "info.php") !== false) {
	header ("location: info.php");
	exit;
} else {
	http_response_code (500);
	?>
	<p>You can only redirect to the info page.</p>
	<?php
	exit;
}
```

This code snippet removes the user-controlled data from the `header` function. Instead of using `$_GET['redirect']` in the `header` function, it directly specifies the redirect target as "info.php". By hardcoding the redirect target, we ensure that the user cannot manipulate the redirect destination.
