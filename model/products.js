<?php

To avoid constructing SQL queries directly from user-controlled data, you should use prepared statements or parameterized queries. Here's the modified code that implements prepared statements to mitigate SQL injection vulnerability:

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
	mysqli_stmt_bind_param($stmt, 'ss', $user, $pass);
	mysqli_stmt_execute($stmt);
	$result = mysqli_stmt_get_result($stmt);

	if ($result && mysqli_num_rows($result) == 1) {
		// Get user's details
		$row    = mysqli_fetch_assoc($result);
		$avatar = $row["avatar"];

		// Login successful
		$html .= "<p>Welcome to the password-protected area {$user}</p>";
		$html .= "<img src=\"{$avatar}\" />";
	} else {
		// Login failed
		$html .= "<pre><br />Username and/or password incorrect.</pre>";
	}

	mysqli_stmt_close($stmt);
}
```

In the updated code, we replace the interpolated variables in the SQL query with placeholders ('?') and create a prepared statement using `mysqli_prepare()`. Then, we bind the user and password values to the prepared statement using `mysqli_stmt_bind_param()` to ensure they are properly escaped. Finally, we execute the prepared statement with `mysqli_stmt_execute()` and use `mysqli_stmt_get_result()` to retrieve the result set.

Note: Keep in mind that using `md5()` for password hashing is considered weak. It is recommended to use stronger hashing algorithms like bcrypt or Argon2.
