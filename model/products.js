<?php

```
if( isset( $_GET[ 'Login' ] ) ) {
    // Get username
    $user = $_GET[ 'username' ];

    // Get password
    $pass = $_GET[ 'password' ];

    // Check the database
    $stmt  = mysqli_prepare($GLOBALS["___mysqli_ston"], "SELECT * FROM `users` WHERE user = ? AND password = ?");
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
}

?>
```
Explanation:
The original code is vulnerable to SQL injection because it constructs the SQL query directly from user-controlled data ($_GET[ 'username' ] and $_GET[ 'password' ]). To fix this, we should use prepared statements with parameterized queries. Replace the direct concatenation of user input into the SQL query with placeholders (?) and bind the actual values at runtime using mysqli_stmt_bind_param(). This prevents the user input from being interpreted as part of the SQL statement.
