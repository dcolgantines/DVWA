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
To remediate the code and avoid constructing SQL queries directly from user-controlled data, you should use prepared statements with parameter binding. Here's the updated code:

```php
<?php

if (!isset($data->id) || !isset($data->first_name) || !isset($data->surname)) {
    $result = array(
        "result" => "fail",
        "error" => 'Invalid format, expecting "{id: {user ID}, first_name: "{first name}", surname: "{surname}"}'
    );
    
    echo json_encode($result);
    exit;
}

$query = "UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?";
$stmt = mysqli_prepare($GLOBALS["___mysqli_ston"], $query);
mysqli_stmt_bind_param($stmt, 'ssi', $data->first_name, $data->surname, $data->id);
mysqli_stmt_execute($stmt);

$result = array("result" => "ok");
echo json_encode($result);
exit;
?>
```

In the updated code, we use a prepared statement with placeholders (`?`). We then bind the user-controlled data using the `mysqli_stmt_bind_param` function, which ensures the data is treated as a parameter and not part of the SQL query itself. This prevents SQL injection attacks.

Please note that you should validate and sanitize the user input before using it in the query to further enhance security.
