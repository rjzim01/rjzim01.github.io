<?php
session_start();

function register($username, $email, $password)
{
    $userData = file_get_contents('users.txt');
    $users = json_decode($userData, true);

    $users[] = [
        'username' => $username,
        'email' => $email,
        'password' => password_hash($password, PASSWORD_DEFAULT),
        'role' => 'user' // Default role
    ];

    file_put_contents('users.txt', json_encode($users));

    // You can redirect to a different page after registration if needed
    header("Location: login.php");
    exit();
}

function login($email, $password)
{
    $userData = file_get_contents('users.txt');
    $users = json_decode($userData, true);

    foreach ($users as $user) {
        if ($user['email'] === $email && password_verify($password, $user['password'])) {
            $_SESSION['email'] = $email;
            $_SESSION['role'] = $user['role'];

            // // Redirect based on role
            // if ($user['role'] === 'admin') {
            //     header("Location: role_management.php");
            // } else {
            //     // Redirect to user dashboard or any other page
            //     header("Location: user_dashboard.php");
            // }

            header("Location: index.php");

            exit();
        }
    }

    // Invalid credentials
    header("Location: login.php");
    exit();
}

function logout()
{
    session_unset();
    session_destroy();
    header("Location: index.php");
    exit();
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'register') {
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        register($username, $email, $password);
    } elseif ($action === 'login') {
        $email = $_POST['email'];
        $password = $_POST['password'];

        login($email, $password);

    } elseif ($action === 'logout') {
        logout();
    } elseif ($action === 'createRole') {
        // This action is handled in role_management.php
    } elseif ($action === 'editRole') {
        // This action is handled in role_management.php
    } elseif ($action === 'deleteRole') {
        // This action is handled in role_management.php
    }
}
?>