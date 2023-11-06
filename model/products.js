<?php
header("Content-Type: application/json; charset=UTF-8");

if (array_key_exists ("callback", $_GET)) {
	$callback = $_GET['callback'];
} else {
	return "";
}

$outp = array ("answer" => "15");

echo $callback . "(".json_encode($outp).")";
To avoid reflecting user-controlled data in the code, you can sanitize and validate user input. Here's an example of how you can modify the code to achieve this:

```php
<?php
// Sanitize and validate user input
$userData = isset($_POST['data']) ? $_POST['data'] : '';
$userData = strip_tags($userData);
// Add additional sanitization or validation checks as needed

// Output the sanitized user input
echo $userData;
?>
```

In this code snippet, the `strip_tags()` function is used to remove any HTML tags from the user input. By doing this, you prevent any potential HTML injection attacks. Additionally, you can add more sanitization or validation checks to ensure the data is safe before using it further.
