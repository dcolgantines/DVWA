<?php

This code snippet is vulnerable to SQL injection as it constructs SQL queries directly from user-controlled data ($_GET['username'] and $_GET['password']). To remediate this vulnerability, you should use prepared statements or parameterized queries.

Here's the updated code snippet using prepared statements:

```php
if( isset( $_GET[ 'Login' ] ) ) {
	// Get username
	$user = $_GET[ 'username' ];

	// Get password
	$pass = $_GET[ 'password' ];
	$pass = md5( $pass );

	// Check the database
	$query  = "SELECT * FROM `users` WHERE user = ? AND password = ?";
	$stmt = mysqli_prepare($GLOBALS["___mysqli_ston"], $query);
	mysqli_stmt_bind_param($stmt, "ss", $user, $pass);
	mysqli_stmt_execute($stmt);
	$result = mysqli_stmt_get_result($stmt);

	if( $result && mysqli_num_rows( $result ) == 1 ) {
		// Get users details
		$row    = mysqli_fetch_assoc( $result );
		$avatar = $row["avatar"];

		// Login successful
		$html .= "<p>Welcome to the password protected area {$user}</p>";
		$html .= "<img src=\"{$avatar}\" />";
	}
	else {
		// Login failed
		$html .= "<pre><br />Username and/or password incorrect.</pre>";
	}

	mysqli_stmt_close($stmt);
	mysqli_close($GLOBALS["___mysqli_ston"]);
}
```

By using prepared statements with parameterized queries, we separate the SQL logic from the user input, preventing SQL injection attacks.
