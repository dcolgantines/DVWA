<?php
header("Content-Type: application/json; charset=UTF-8");

if (array_key_exists ("callback", $_GET)) {
	$callback = $_GET['callback'];
} else {
	return "";
}

$outp = array ("answer" => "15");

echo $callback . "(".json_encode($outp).")";
To prevent reflecting user-controlled data in the code, you can make use of proper escaping or sanitization techniques. Here's an example of how you can modify the code to avoid reflecting user-controlled data:

```php
<?php
// Retrieve user input from a form field or any other source
$userInput = $_POST['user_input'];

// Escape and output the user input
echo htmlentities($userInput, ENT_QUOTES, 'UTF-8');
?>
```

In the above code snippet, the `htmlentities()` function is used to escape any special characters in the user input. This ensures that the user-controlled data is rendered as plain text and does not execute any HTML or JavaScript code. The `ENT_QUOTES` flag is used to encode both double and single quotes. The `'UTF-8'` parameter sets the character set used for encoding.

By using this approach, you avoid the risk of injecting malicious code supplied by users and protect against cross-site scripting (XSS) attacks.
