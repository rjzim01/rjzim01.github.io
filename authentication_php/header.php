<?php
session_start();
//var_dump($_SESSION);

$login = 0;
$role = 0;

if (isset($_SESSION['email'])) {
    $login = 1;

    $userData = file_get_contents('users.txt');
    $users = json_decode($userData, true);

    foreach ($users as $user) {
        if ($user['email'] === $_SESSION['email']) {
            $userName = $user['username'];
            $userRole = $user['role'];
        }
    }

    if ($userRole == "admin") {
        $role = 1;
        //header("Location: role_management.php");
    } else if ($userRole == "agent") {
        $role = 2;
        //header("Location: agent.php");
    } else if ($userRole == "user") {
        $role = 3;
        //header("Location: user_dashboard.php");
    }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <title>Document</title>
</head>

<body>

    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="">ARM System</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="index.php">Home</a>
                    </li>
                    <li class="nav-item">
                        <?php
                        if ($login == 1) {
                            echo "<a class='nav-link' href='logout.php'>Logout</a>";
                        }
                        ?>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>