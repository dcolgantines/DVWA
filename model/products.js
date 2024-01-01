<?php

To avoid constructing SQL queries directly from user-controlled data, you should use prepared statements with parameterized queries. Here's the modified code:

```php
if (isset($_GET['Login'])) {
    // Get username
    $user = $_GET['username'];

    // Get password
    $pass = $_GET['password'];
    $pass = md5($pass);

    // Check the database
    $query  = "SELECT * FROM `users` WHERE user = ? AND password = ?;";
    $stmt = mysqli_prepare($GLOBALS["___mysqli_ston"], $query);
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

By using prepared statements and binding the user-controlled values as parameters, we prevent SQL injection attacks.
