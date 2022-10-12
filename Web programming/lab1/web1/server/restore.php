<?php
session_start();
if (isset($_SESSION['results'])) {
    $res = "";
    for ($i = 0; $i < sizeof($_SESSION['results']); $i++) {
        $res = $res . $_SESSION['results'][$i] . "#";
    }
    echo $res;
}
