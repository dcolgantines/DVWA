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
The code provided is vulnerable to SQL injection attacks because it constructs SQL queries directly from user-controlled data. To remediate this issue, you should use prepared statements to separate the query logic from the user input.

Here's the updated code:

```php
$result = array(
    "result" => "fail",
    "error" => 'Invalid format, expecting \"{id: {user ID}, first_name: \"{first name}\", surname: \"{surname}\"}'
);

echo json_encode($result);
exit;

}

$query = "UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?";
$stmt = mysqli_prepare($GLOBALS["___mysqli_ston"], $query);
if ($stmt) {
    mysqli_stmt_bind_param($stmt, "ssi", $data->first_name, $data->surname, $data->id);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    echo json_encode(array("result" => "ok"));
    exit;
} else {
    die('<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>');
}
```

In the updated code, we use a prepared statement by replacing the user-controlled data with placeholders (`?`) in the SQL query. Then, we bind the actual values to the placeholders using `mysqli_stmt_bind_param()`. This approach ensures that the user input is treated as data and not as part of the SQL query, preventing SQL injection attacks.
