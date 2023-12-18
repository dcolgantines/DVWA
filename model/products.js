<?php

Here's the updated code snippet that avoids constructing SQL queries directly from user-controlled data:

```php
if (isset($_GET['Login'])) {
    // Get username
    $user = $_GET['username'];

    // Get password
    $pass = $_GET['password'];
    $pass = md5($pass);

    // Prepare the query
    $stmt = $GLOBALS["___mysqli_ston"]->prepare("SELECT * FROM users WHERE user = ? AND password = ?");
    $stmt->bind_param("ss", $user, $pass);
    
    // Execute the query
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    if ($result && $result->num_rows == 1) {
        // Get user's details
        $row = $result->fetch_assoc();
        $avatar = $row["avatar"];

        // Login successful
        $html .= "<p>Welcome to the password protected area {$user}</p>";
        $html .= "<img src=\"{$avatar}\" />";
    } else {
        // Login failed
        $html .= "<pre><br />Username and/or password incorrect.</pre>";
    }

    // Close the statement
    $stmt->close();
}
```

This code uses prepared statements to prevent SQL injection attacks. It binds the username and password as parameters in the query, eliminating the need to directly interpolate user-controlled data into the query string.
