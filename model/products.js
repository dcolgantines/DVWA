<?php

To prevent SQL injection vulnerabilities, you should use prepared statements or parameterized queries instead of interpolating user-controlled data directly into the SQL query. Here's the modified code:

```php
if (isset($_GET['Login'])) {
	// Get username
	$user = $_GET['username'];

	// Get password
	$pass = $_GET['password'];
	$pass = md5($pass);

	// Check the database
	$query  = "SELECT * FROM `users` WHERE user = ? AND password = ?";
	$stmt = mysqli_prepare($GLOBALS["___mysqli_ston"], $query);
	mysqli_stmt_bind_param($stmt, "ss", $user, $pass);
	mysqli_stmt_execute($stmt);
	$result = mysqli_stmt_get_result($stmt);

	if ($result && mysqli_num_rows($result) == 1) {
		// Get users details
		$row    = mysqli_fetch_assoc($result);
		$avatar = $row["avatar"];

		// Login successful
		$html .= "<p>Welcome to the password protected area {$user}</p>";
		$html .= "<img src=\"{$avatar}\" />";
	} else {
		// Login failed
		$html .= "<pre><br />Username and/or password incorrect.</pre>";
	}

	mysqli_stmt_close($stmt);
}
```

In the updated code:

1. The SQL query is replaced with a parameterized query using placeholders (`?`). 
2. A prepared statement is created using `mysqli_prepare()`.
3. The values of `$user` and `$pass` are bound to the prepared statement using `mysqli_stmt_bind_param()`.
4. The prepared statement is executed using `mysqli_stmt_execute()`.
5. The result of the query is obtained using `mysqli_stmt_get_result()`.
6. The rest of the code remains the same.

By using parameterized queries, you can prevent SQL injection attacks by ensuring that user-controlled data is treated as data rather than executable code.
