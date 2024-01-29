<?php
header("Content-Type: application/json; charset=UTF-8");

if (array_key_exists ("callback", $_GET)) {
	$callback = $_GET['callback'];
} else {
	return "";
}

$outp = array ("answer" => "15");

echo $callback . "(".json_encode($outp).")";
To avoid reflecting user-controlled data directly in the output, you can use the htmlspecialchars() function to encode any special characters. Here's the updated code:
```
<?php
// Retrieve the user-controlled data from a safe source (e.g. database)
$userData = "Hello <script>alert('XSS')</script>";

// Encode the user-controlled data using htmlspecialchars()
$encodedData = htmlspecialchars($userData, ENT_QUOTES, 'UTF-8');

// Output the encoded data
echo $encodedData;
?>
```
