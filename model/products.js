<?php

Here's the modified code snippet that avoids constructing SQL queries directly from user-controlled data:

```
if(isset($_GET['Login'])) {
    // Get username
    $user = mysqli_real_escape_string($GLOBALS["___mysqli_ston"], $_GET['username']);

    // Get password
    $pass = mysqli_real_escape_string($GLOBALS["___mysqli_ston"], $_GET['password']);
    $pass = md5($pass);

    // Check the database
    $stmt = $GLOBALS["___mysqli_ston"]->prepare("SELECT * FROM `users` WHERE user = ? AND password = ?");
    $stmt->bind_param("ss", $user, $pass);
    $stmt->execute();
    $result = $stmt->get_result();

    if($result && mysqli_num_rows($result) == 1) {
        // Get user's details
        $row    = mysqli_fetch_assoc($result);
        $avatar = $row["avatar"];

        // Login successful
        $html .= "<p>Welcome to the password protected area {$user}</p>";
        $html .= "<img src=\"{$avatar}\" />";
    } else {
        // Login failed
        $html .= "<pre><br />Username and/or password incorrect.</pre>";
    }

    $stmt->close();
    ((is_null($___mysqli_res = mysqli_close($GLOBALS["___mysqli_ston"]))) ? false : $___mysqli_res);
}
```

In this modified code:
1. The username and password received from the user are escaped using `mysqli_real_escape_string` function to prevent SQL injection.
2. The SQL query is replaced with a prepared statement using placeholders (?) to bind the escaped user input.
3. The prepared statement is then executed and the result is obtained.
4. After fetching the relevant data, the prepared statement is closed and the database connection is closed.
