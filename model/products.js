<?php
header("Content-Type: application/json; charset=UTF-8");

if (array_key_exists ("callback", $_GET)) {
	$callback = $_GET['callback'];
} else {
	return "";
}

$outp = array ("answer" => "15");

echo $callback . "(".json_encode($outp).")";
```php
<?php
// Set user-controlled data to a variable 
$userData = $_GET['data'];

// Escape and output the user-controlled data
echo htmlspecialchars($userData, ENT_QUOTES, 'UTF-8');
```
```
