<?php

if (array_key_exists ("redirect", $_GET) && $_GET['redirect'] != "") {
```
if (isset($_GET['redirect'])) {
    $allowedRedirects = array("info.php");
    $redirect = $_GET['redirect'];
    $isValidRedirect = false;

    foreach ($allowedRedirects as $allowedRedirect) {
        if (strpos($redirect, $allowedRedirect) !== false) {
            $isValidRedirect = true;
            break;
        }
    }

    if ($isValidRedirect) {
        header("Location: " . $redirect);
        exit;
    } else {
        http_response_code(500);
        ?>
        <p>You can only redirect to the info page.</p>
        <?php
        exit;
    }
}

http_response_code(500);
?>
<p>Missing redirect target.</p>
<?php
exit;
```

Explanation:
- The code first checks if the 'redirect' value is set in the GET parameters using isset().
- It defines an array of allowed redirect targets (in this case, only "info.php" is allowed). This array can be expanded to include more allowed redirect targets.
- It loops through each allowed redirect target and checks if it exists within the 'redirect' value using strpos().
- If a valid redirect target is found, it performs the redirection using header() and exits the script.
- If none of the allowed redirect targets are found, it sets the HTTP response code to 500 and displays an error message.
- If the 'redirect' value is not set, it sets the HTTP response code to 500 and displays a different error message.
