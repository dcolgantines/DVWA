<?php

To avoid constructing SQL queries directly from user-controlled data, you should use prepared statements.

Here's the modified code:

```php
if( isset( $_GET[ 'Login' ] ) ) {
    // Get username
    $user = $_GET[ 'username' ];

    // Get password
    $pass = $_GET[ 'password' ];
    $pass = md5( $pass );

    // Check the database
    $query  = "SELECT * FROM `users` WHERE user = ? AND password = ?;";
    $stmt = mysqli_prepare($GLOBALS["___mysqli_ston"], $query);
    mysqli_stmt_bind_param($stmt, 'ss', $user, $pass);
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

    ((is_null($___mysqli_res = mysqli_close($GLOBALS["___mysqli_ston"]))) ? false : $___mysqli_res);
}
```

In the modified code, we use prepared statements with placeholders (`?`) instead of directly concatenating user input into the query string. This helps prevent SQL injection attacks by ensuring that user-controlled data is treated as data and not as part of the query syntax. We bind the user input values to the placeholders using `mysqli_stmt_bind_param` and execute the prepared statement with `mysqli_stmt_execute`. After that, we can retrieve the result using `mysqli_stmt_get_result` and proceed with the rest of the logic as before.
