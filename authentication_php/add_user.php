<?php

include("header.php");

//session_start();
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    header("Location: login.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    //$role = $_POST['role'];

    // Validate input (you may want to add more thorough validation)
    if (!empty($username) && !empty($email) && !empty($password)) {
        // Load user data
        $userData = file_get_contents('users.txt');
        $users = json_decode($userData, true);

        // Add the new user to the array
        $users[] = [
            'username' => $username,
            'email' => $email,
            'password' => password_hash($password, PASSWORD_DEFAULT),
            //'role' => $role
            'role' => 'user'
        ];

        // Save updated user data
        file_put_contents('users.txt', json_encode($users));

        // Redirect back to the role management page after adding user
        header("Location: role_management.php");
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Add User</title>
</head>

<body>
    <div class="container m-5">
        <h1>Add User</h1>
        <form action="add_user.php" method="post">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Username</label>
                <input type="text" name="username" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" name="email" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" name="password" class="form-control" id="exampleInputPassword1">
            </div>

            <button type="submit" value="Add User" class="btn btn-primary">Submit</button>
        </form>
    </div>
</body>

</html>