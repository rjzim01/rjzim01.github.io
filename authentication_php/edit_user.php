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

// Retrieve the email from the form
$email = $_POST['email'];

// Find the user with the matching email
$userKey = null;
foreach ($users as $key => $user) {
    if ($user['email'] === $email) {
        $userKey = $key;
        break;
    }
}

if ($userKey === null) {
    header("Location: role_management.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newUsername = isset($_POST['newUsername']) ? $_POST['newUsername'] : '';
    $newEmail = isset($_POST['newEmail']) ? $_POST['newEmail'] : '';
    $newRole = isset($_POST['newRole']) ? $_POST['newRole'] : '';

    if (!empty($newUsername) && !empty($newEmail) && !empty($newRole)) {
        $users[$userKey]['username'] = $newUsername;
        $users[$userKey]['email'] = $newEmail;
        $users[$userKey]['role'] = $newRole;

        // Save updated user data
        file_put_contents('users.txt', json_encode($users));
        header("Location: role_management.php");
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Edit User Information</title>
</head>

<body>
    <div class="container m-5">
        <h1>Edit User Information</h1>
        <form action="edit_user.php" method="post">
            <input type="hidden" name="email" value="<?php echo $users[$userKey]['email']; ?>">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Username</label>
                <input type="text" name="newUsername" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" value="<?php echo $users[$userKey]['username']; ?>" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" name="newEmail" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" value="<?php echo $users[$userKey]['email']; ?>" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Role</label>
                <input type="text" name="newRole" class="form-control" id="exampleInputPassword1"
                    value="<?php echo $users[$userKey]['role']; ?>" readonly required>
            </div>

            <button type="submit" value="Save Changes" class="btn btn-primary">Submit</button>
        </form>
    </div>
</body>

</html>