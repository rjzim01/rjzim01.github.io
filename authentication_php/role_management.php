<?php

include("header.php");

//session_start();
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    header("Location: login.php");
    exit();
}

// Load user data
$userData = file_get_contents('users.txt');
$users = json_decode($userData, true);


foreach ($users as $user) {
    if ($user['email'] === $_SESSION['email']) {
        $userName = $user['username'];
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'editUser') {
        // Handle editing of user information (as in the previous response)
    } elseif ($action === 'deleteUser') {
        $email = $_POST['email'];
        if (!empty($email)) {
            foreach ($users as $key => $user) {
                if ($user['email'] === $email) {
                    unset($users[$key]);
                    break;
                }
            }

            // Save updated user data
            file_put_contents('users.txt', json_encode(array_values($users)));
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Role Management</title>
</head>

<body>
    <div class="m-3">
        <h1>Welcome,
            <?php echo $userName; ?>!
        </h1>
        <h4>Available users...</h4>
        <a href="add_user.php" class="btn btn-success mt-3 mb-3">Add User</a>

        <table class="table table-success table-striped table-bordered">
            <tr>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th colspan="2">Action</th>
            </tr>
            <?php foreach ($users as $user): ?>
                <tr>
                    <td>
                        <?php echo $user['email']; ?>
                    </td>
                    <td>
                        <?php echo $user['username']; ?>
                    </td>
                    <td>
                        <?php echo $user['role']; ?>
                    </td>
                    <td>
                        <form action="edit_user.php" method="post">
                            <input type="hidden" name="email" value="<?php echo $user['email']; ?>">
                            <input type="submit" value="Edit" class="btn btn-info">
                        </form>
                    </td>
                    <td>
                        <form action="role_management.php" method="post">
                            <input type="hidden" name="action" value="deleteUser">
                            <input type="hidden" name="email" value="<?php echo $user['email']; ?>">
                            <input type="submit" value="Delete" class="btn btn-danger">
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
        </table>
    </div>
    <!-- 
    <form action="functions.php" method="post">
        <input type="hidden" name="action" value="logout">
        <input type="submit" value="Logout">
    </form> -->
</body>

</html>