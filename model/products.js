<?php
header("Content-Type: application/json; charset=UTF-8");

if (array_key_exists ("callback", $_GET)) {
	$callback = $_GET['callback'];
} else {
	return "";
}

$outp = array ("answer" => "15");

echo $callback . "(".json_encode($outp).")";
To prevent reflecting user-controlled data, we should apply proper sanitization and output encoding. Here's an example of how you can achieve this:

```php
<?php
// Fetch user-controlled data from request parameters or database
$userInput = $_GET['input'];

// Sanitize user input to prevent any possible malicious content
$sanitizedInput = htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');

// Output the sanitized data
echo $sanitizedInput;
?>
```

In the updated code snippet, we use the `htmlspecialchars` function to escape any special characters in the user input. This prevents HTML/Script injection attacks by converting characters like `<`, `>`, `"`, `'`, and `&` to their corresponding HTML entities.
