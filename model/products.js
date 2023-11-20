<?php
define( 'DVWA_WEB_PAGE_TO_ROOT', '../../' );
require_once DVWA_WEB_PAGE_TO_ROOT . 'dvwa/includes/dvwaPage.inc.php';

dvwaDatabaseConnect();

/*
On impossible only the admin is allowed to retrieve the data.
*/

if (dvwaSecurityLevelGet() == "impossible" && dvwaCurrentUser() != "admin") {
	print json_encode (array ("result" => "fail", "error" => "Access denied"));
	exit;
}

if ($_SERVER['REQUEST_METHOD'] != "POST") {
	$result = array (
						"result" => "fail",
						"error" => "Only POST requests are accepted"
					);
	echo json_encode($result);
	exit;
}

try {
	$json = file_get_contents('php://input');
	$data = json_decode($json);
	if (is_null ($data)) {
		$result = array (
							"result" => "fail",
							"error" => 'Invalid format, expecting "{id: {user ID}, first_name: "{first name}", surname: "{surname}"}'

						);
		echo json_encode($result);
		exit;
	}
} catch (Exception $e) {
	$result = array (
To avoid constructing SQL queries directly from user-controlled data, you can use prepared statements with parameterized queries. Here's the updated code:

```php
"result" => "fail",
"error" => 'Invalid format, expecting \"{id: {user ID}, first_name: "{first name}", surname: "{surname}\"}'
);
echo json_encode($result);
exit;
}

$query = "UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?";
$stmt = $GLOBALS["___mysqli_ston"]->prepare($query);
$stmt->bind_param("ssi", $data->first_name, $data->surname, $data->id);
$result = $stmt->execute();

if (!$result) {
    die('<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>');
}

echo json_encode(["result" => "ok"]);
exit;
?>
```

In the updated code, we create a prepared statement with a parameterized query. The question marks (?) act as placeholders for the user-controlled data. We then bind the values to the placeholders using `bind_param` to ensure that the input is properly sanitized and does not introduce any SQL injection vulnerabilities. Finally, we execute the statement and check the result before returning the appropriate response.
