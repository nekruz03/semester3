<?php

session_start();
$start = microtime(true); // Время начала исполнения скрипта
$validX = array(-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2);
$r = htmlspecialchars($_POST["r"]);
$x = htmlspecialchars($_POST["x"]);
$y = htmlspecialchars($_POST["y"]);
if (is_numeric($r)) $int_value_r = floatval($r); else $int_value_r = null;
if (is_numeric($x)) $int_value_x = floatval($x); else $int_value_x = null;
if (is_numeric($y)) $int_value_y = floatval($y); else $int_value_y = null;
//$int_value_r = is_numeric($r) ? floatval($r) : null;
//$int_value_x = is_numeric($x) ? floatval($x) : null;
//$int_value_y = is_numeric($y) ? floatval($y) : null;
date_default_timezone_set("Europe/Moscow");
$current_time = date("H:i:s");
$message = "";
$class = "No";

if ($int_value_r == 0 && $int_value_x == 0 && $int_value_y == 0) {
  $message = "Insert data";
  $class = "Insert data";
}
else
if ($int_value_r === null || $int_value_r > 4 || $int_value_r < 1)
{
  $message = "Invalid R";
  $class = "Invalid R";
}
else
if ($int_value_x === null || !in_array($x, $validX))
{
  $message = "Invalid X";
  $class = "Invalid X";
}
else
if ($int_value_y === null || $int_value_y > 3 || $int_value_y < -5)
{
  $message = "Invalid Y";
  $class = "Invalid Y";
}
else
if ((($int_value_x <= 0 && $int_value_y <= 0 && ($int_value_x * $int_value_x + $int_value_y * $int_value_y) <= $int_value_r * $int_value_r)) ||
     ($int_value_x >= 0 && $int_value_y >= 0 && ($int_value_y <= - $int_value_x / 2 + $int_value_r / 2)) ||
     ($int_value_x <= 0 && $int_value_y >= 0 && $int_value_x >= -$int_value_r && $int_value_y <= $int_value_r / 2)) {
  $message = "Yes";
  $class = "Yes";
} else {
  $message = "No";
}

$time = strval(number_format(microtime(true) - $start, 9, ".", "")*1000) . ' ms';

// Сохранение в сессию
$result = array($int_value_x, $int_value_y, $int_value_r, $message, $time, $current_time);
if (!isset($_SESSION['results'])) {
  $_SESSION['results'] = array();
}
array_push($_SESSION['results'], $result);

// Печать в таблицу
print_r('<tr><td>'.$int_value_x.'</td><td>'.$int_value_y.'</td><td>'.$int_value_r.'</td><td class="'.$class.'">'.$message.'</td><td>'.$time.'</td><td>'.$current_time.'</td></tr>');

?>
