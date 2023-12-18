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
```php
if (!is_object($data) || !isset($data->id) || !isset($data->first_name) || !isset($data->surname)) {
    $result = array(
        "result" => "fail",
        "error" => 'Invalid format, expecting \"{id: {user ID}, first_name: "{first name}", surname: "{surname}\"}'
    );
    echo json_encode($result);
    exit;
}

$query = "UPDATE users SET first_name = ?, last_name = ? where user_id = ?";
$stmt = $GLOBALS["___mysqli_ston"]->prepare($query);
$stmt->bind_param("ssi", $data->first_name, $data->surname, $data->id);
$stmt->execute();
$stmt->close();

$result = array("result" => "ok");
echo json_encode($result);
exit;
```

Explanation:
Instead of directly concatenating user-controlled data into the SQL query, we use prepared statements and parameter binding to prevent SQL injection attacks. Additionally, we validate the structure of the input data before proceeding with the query to ensure it meets the expected format.
