<?php
include("header.php");
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'user') {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>User Dashboard</title>
</head>

<body>
    <div class="container m-5">
        <h1>Welcome,
            <?php echo $userName; ?>!
        </h1>
        <p>This is your user dashboard.</p>
        <p>Stay with us we will provide more features very soon...</p>
    </div>
</body>

</html>