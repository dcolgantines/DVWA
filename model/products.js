<?php
header("Content-Type: application/json; charset=UTF-8");

if (array_key_exists ("callback", $_GET)) {
	$callback = $_GET['callback'];
} else {
	return "";
}

$outp = array ("answer" => "15");

echo $callback . "(".json_encode($outp).")";
To avoid reflecting user-controlled data in the code, you can sanitize and escape any user input using the htmlspecialchars function. Here's the updated code:

```php
<?php
$userInput = $_GET['input'];
$escapedInput = htmlspecialchars($userInput);

echo $escapedInput;
?>
```

With this change, any user-controlled data in the `$userInput` variable will be properly sanitized and displayed as plain text, preventing any potential security vulnerabilities.
