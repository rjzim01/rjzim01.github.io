<?php
include("header.php");
//session_start();
//var_dump($_SESSION);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="m-5">
        <h3>Welcome to Authentication and Role Management system</h3>

        <?php
        if ($login == 1 && $role == 1) {
            echo "$userName you are login as $userRole , Here is your <a href='role_management.php'>Dashboard</a>";
        } else if ($login == 1 && $role == 2) {
            echo "$userName you are login as $userRole , Here is your <a href='agent.php'>Dashboard</a>";
        } else if ($login == 1 && $role == 3) {
            echo "$userName you are login as $userRole , Here is your <a href='user_dashboard.php'>Dashboard</a>";
        } else {
            echo "You are not logged in! Please <a href='login.php'>Login</a> to continue!";
        }
        ?>

    </div>
</body>

</html>