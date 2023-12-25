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
UPDATED CODE:

```
$data = json_decode(file_get_contents('php://input'));

if (!$data || !isset($data->id) || !isset($data->first_name) || !isset($data->surname)) {
    $result = array(
        "result" => "fail",
        "error" => 'Invalid format, expecting "{id: {user ID}, first_name: "{first name}", surname: "{surname}"'
    );
    echo json_encode($result);
    exit;
}

$stmt = $GLOBALS["___mysqli_ston"]->prepare("UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?");
$stmt->bind_param("ssi", $data->first_name, $data->surname, $data->id);
$stmt->execute();

if ($stmt->error) {
    $result = array(
        "result" => "fail",
        "error" => $stmt->error
    );
    echo json_encode($result);
    exit;
}

$result = array(
    "result" => "ok"
);
echo json_encode($result);
exit;
```

Explanation:
The original code was constructing an SQL query directly from user-controlled data, which is prone to SQL injection attacks. The updated code uses a prepared statement with parameter binding to avoid this vulnerability. The input data is properly validated and sanitized before being used in the query. Please note that the mysqli extension is being used in the updated code.
