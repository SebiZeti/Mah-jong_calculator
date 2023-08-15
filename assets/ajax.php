<?php 
    session_start();

    $action = "";

    if(isset($_POST["action"])){
        $action = $_POST["action"];
    }

    if($action == "calcTiles"){
        echo "caught!";
    }
?>