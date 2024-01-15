<?php

The code snippet provided is vulnerable to SQL injection because it constructs the SQL query directly from user-controlled data. To remediate this issue, we should use prepared statements or parameterized queries.

Here's the patched code snippet that uses prepared statements:

```php
if (isset($_GET['Login'])) {
    // Get username
    $user = $_GET['username'];

    // Get password
    $pass = $_GET['password'];
    $pass = md5($pass);

    // Check the database
    $stmt = mysqli_prepare($GLOBALS["___mysqli_ston"], "SELECT * FROM `users` WHERE user = ? AND password = ?");
    mysqli_stmt_bind_param($stmt, "ss", $user, $pass);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($result && mysqli_num_rows($result) == 1) {
        // Get user's details
        $row = mysqli_fetch_assoc($result);
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

In the patched code snippet, we create a prepared statement using `mysqli_prepare`, bind the user-controlled data using `mysqli_stmt_bind_param`, execute the statement using `mysqli_stmt_execute`, and retrieve the result using `mysqli_stmt_get_result`. This way, the user input is properly handled and prevents SQL injection attacks.
