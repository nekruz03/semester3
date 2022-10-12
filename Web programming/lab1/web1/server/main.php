<?php
function isAllSet() {
    return isset($_GET["x"]) and isset($_GET["y"]) and isset($_GET["r"]);
}

function areAllValuesCorrect($x, $y, $r) {
    return $x <= 4 and $x >= -4 && $y < 5 and $y > -5 and $r >= 1 and $r <=3;
}

function check_left_top($x, $y, $r) {
    return $y >= 0 && $x <= 0 && ($y ** 2) + ($x ** 2) <= (($r ** 2) / 4);
}
function check_right_top($x, $y, $r) {
    return $y <= ($r / 2) && $x - ($y * 2) >= 0 && $y >= 0 && $x >= 0 && $x <= $r;
}
function check_right_bottom($x, $y, $r) {
    return $y <= 0 && $y >= -$r && $x >= 0 && $x <= ($r / 2);
}
if (isset($_GET) && isAllSet()) {
    session_start();
    $start = microtime(true);
    $x = $_GET['x'];
    $y = $_GET['y'];
    $r = $_GET['r'];
    $count = 0;

    if (!areAllValuesCorrect($x, $y, $r)){
        echo "error";
    }
    else {
        $check = check_right_bottom($x, $y, $r) || check_right_top($x, $y, $r) || check_left_top($x, $y, $r);


        $time = number_format(microtime(true) - $start, 6);
        $dt = new DateTime("now", new DateTimeZone('Europe/Moscow'));
        $dt = $dt->format('H:i:s');

        $otv = "";
        if ($check) {
            $otv = "Попадает";
        } else {
            $otv = "Не попадает";
        }

        $result = "<tr><td>" .$dt . "</td> <td>" . $time . "</td> <td>" .$x ."</td> <td>" . $y . "</td> <td>" . $r . "</td> <td>" . $otv . "</td></tr>";

        if (!isset($_SESSION['results'])) {
            $_SESSION['results'] = array();
        }
        array_push($_SESSION['results'], $result);

        echo $result;


        //echo $dt . "#" . $time . "#" . $x . "#" . $y . "#" . $r . "#" . $otv . "#";
    }
}
else {
    echo "error";
}


