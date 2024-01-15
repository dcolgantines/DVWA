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
```
$data = json_decode(file_get_contents('php://input'));

if (!isset($data->id) || !isset($data->first_name) || !isset($data->surname)) {
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

print json_encode(array("result" => "ok"));
exit;
```

In the remediated code:
- Instead of directly constructing the SQL query using string concatenation, we prepare a parameterized query using placeholders (?).
- We then bind the user-controlled data to the placeholders using the `bind_param()` function. This helps prevent SQL injection by treating the user-controlled data as parameters rather than part of the query itself.
- The `json_decode()` function is used to securely retrieve the JSON data sent by the client.
- We check if all the required properties (id, first_name, and surname) are present in the JSON data. If any of them are missing, we return an appropriate error response.
- We use prepared statements and parameter binding with the `mysqli` extension to provide a secure and efficient way of executing SQL queries.
