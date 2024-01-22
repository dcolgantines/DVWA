<?php
header("Content-Type: application/json; charset=UTF-8");

if (array_key_exists ("callback", $_GET)) {
	$callback = $_GET['callback'];
} else {
	return "";
}

$outp = array ("answer" => "15");

echo $callback . "(".json_encode($outp).")";
To avoid reflecting user-controlled data in the code, you can use proper input validation and sanitization techniques. Here's an example of how it can be done:

```php
<?php

// Validate and sanitize user input before using it
$name = isset($_POST['name']) ? filter_var($_POST['name'], FILTER_SANITIZE_STRING) : '';

// Output the sanitized data
echo 'Hello, ' . $name . '!';

?>
```

In the code above, `filter_var` is used to sanitize the `name` input by removing any HTML tags or special characters. The `FILTER_SANITIZE_STRING` flag is used to sanitize the input as a string. It's important to note that this is just an example of input sanitization; you should adopt appropriate validation and sanitization techniques based on the specific requirements and context of your application.
