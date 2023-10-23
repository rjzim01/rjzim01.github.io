<?php
include("header.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>

<body>
    <div class="container m-5">
        <h1>Login</h1>
        <form action="functions.php" method="post">
            <input type="hidden" name="action" value="login">
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

            <p class="mt-3">Not Registered! <a href="register.php">Register Here...</a></p>

            <button type="submit" value="Login" class="btn btn-primary">Submit</button>
        </form>
    </div>
</body>

</html>