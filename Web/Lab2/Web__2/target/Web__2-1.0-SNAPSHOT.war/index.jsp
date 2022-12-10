<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="author" content="Ivan Ponomarev">
    <title>Лаб 2</title>
    <meta name="description" content="second lab work for web-programming">
    <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
    <script src="./scripts/main.js"></script>
    <link rel="stylesheet" href="./styles/stylesheet.css">
</head>

<body>
<table id='main' width="100%">
    <tr id="heading">
        <th width="10%">Информация</th>
        <th width="45%">График</th>
        <th width="45%">Заданная область</th>
    </tr>
    <tr>
        <td id="hat"><br>
            <p>Создатель:</p>
            <p>Пономарев Иван Михайлович</p>
            <p>Группа: Р32111</p>
            <p>Вариант: 1015</p><br>
            <p>Правила пользования:</p>
            <p>1. Введите значение параметра R.</p>
            <p>2. Введите координаты точки.</p>
            <p>3. Дождитесь ответа.</p>
            <p>
            <ul id="links">
                <li><a class="pointer" href="https://github.com/PonomarevIvan2003/web2">Исходный код</a></li>
            </ul>
            </p>
        </td>
        <td id="area" width="20%">
            <br>
            <section id="coordinate-system">
                <svg width="300px" height="300px" xmlns="http://www.w3.org/2000/svg" onclick="svgHandler(event)">
                    <!-- Координатные оси -->
                    <line x1="0" x2="300" y1="150" y2="150" stroke="#343548"></line>
                    <line x1="150" x2="150" y1="0" y2="300" stroke="#343548"></line>
                    <!--Стрелки-->
                    <polygon points="150,0 145,10 155,10" stroke="#343548"></polygon>
                    <polygon points="300,150 290,145 290,155" stroke="#343548"></polygon>
                    <!--Прямоугольник во второй четверти-->
                    <polygon points="50,150 150,150 150,100 50,100" fill="rgb(51,153,255)"
                             fill-opacity="0.9"></polygon>
                    <!--Треугольник в третьей четверти-->
                    <polygon points="100,150 150,150 150,250" fill="rgb(51,153,255)" fill-opacity="0.9"></polygon>
                    <!--Четверть круга в четвертой четверти-->
                    <path d="M150,200 C 175,200 200,175 200,150 L 150,150" fill="rgb(51,153,255)"
                          fill-opacity="0.9"></path>

                    <!-- Метки для значений R на оси X -->
                    <circle id="circleX_1" cx="50" cy="150" r="3" fill="black"/>
                    <circle id="circleX_2" cx="100" cy="150" r="3" fill="black"/>
                    <circle id="circleCenter" cx="150" cy="150" r="3" fill="black"/>
                    <circle id="circleX_3" cx="200" cy="150" r="3" fill="black"/>
                    <circle id="circleX_4" cx="250" cy="150" r="3" fill="black"/>

                    <!-- Метки для значений R на оси Y -->
                    <circle id="circleY_1" cx="150" cy="50" r="3" fill="black"/>
                    <circle id="circleY_2" cx="150" cy="100" r="3" fill="black"/>
                    <circle id="circleY_3" cx="150" cy="200" r="3" fill="black"/>
                    <circle id="circleY_4" cx="150" cy="250" r="3" fill="black"/>

                    <!-- Подписи к осям -->
                    <text x="285" y="135">X</text>
                    <text x="155" y="15">Y</text>
                    <!-- Значения R на оси X -->
                    <text id="nameX_1"  x="40" y="138">-R</text>
                    <text x="85" y="138">-R/2</text>
                    <text x="190" y="138">R/2</text>
                    <text id="nameX_2" x="245" y="138">R</text>
                    <!-- Значения R на оси Y -->
                    <text id="nameY_1" x="162" y="54">R</text>
                    <text x="162" y="104">R/2</text>
                    <text x="162" y="204">-R/2</text>
                    <text id="nameY_2" x="162" y="254">-R</text>
                    <c:forEach items="${collection}" var="col">
                        <circle class="shot" cx="${150 + 50 * 2/col.getR() * col.getX()}"
                                cy="${150 - 50 * 2/col.getR() * col.getY()}" r="2"
                                fill="red" stroke-width="0"></circle>
                    </c:forEach>
                </svg>
            </section>

        </td>
        <td id="data" width="60%">
            <br>
            <form class="form" id="form" onsubmit="formHandler(event)">
                <div class="x-value" id="x-value">
                    <label class="input-label">Выберите X:</label><br>
                    <input type="radio" name="x-value" id="x-5" value="-5">
                    <label for="x-5">-5</label>
                    <input type="radio" name="x-value" id="x-4" value="-4">
                    <label for="x-4">-4</label>
                    <input type="radio" name="x-value" id="x-3" value="-3">
                    <label for="x-3">-3</label>
                    <input type="radio" name="x-value" id="x-2" value="-2">
                    <label for="x-2">-2</label>
                    <input type="radio" name="x-value" id="x-1" value="-1">
                    <label for="x-1">-1</label>
                    <input type="radio" name="x-value" id="x0" value="0">
                    <label for="x0">0</label>
                    <input type="radio" name="x-value" id="x1" value="1">
                    <label for="x1">1</label>
                    <input type="radio" name="x-value" id="x2" value="2">
                    <label for="x2">2</label>
                    <input type="radio" name="x-value" id="x3" value="3">
                    <label for="x3">3</label>
                </div>

                <br>
                <div class="y-value">
                    <label for="y-value" class="input-label">Введите Y - значение из интервала (-5; 5): </label><br>
                    <input type="text" id="y-value" name="y-value" placeholder="Enter Y" maxlength="10">
                </div>
                <br>


                <div class="r-value" id="r-value" onchange="changingPlot()">
                    <label class="input-label">Выберите R:</label><br>
                    <input type="radio" name="r-value" id="r1" value="1">
                    <label for="r1">1</label>
                    <input type="radio" name="r-value" id="r15" value="1.5">
                    <label for="r15">1.5</label>
                    <input type="radio" name="r-value" id="r2" value="2">
                    <label for="r2">2</label>
                    <input type="radio" name="r-value" id="r25" value="2.5">
                    <label for="r25">2.5</label>
                    <input type="radio" name="r-value" id="r3" value="3">
                    <label for="r3">3</label>
                </div>


                <input type="submit" id="submit-btn" value="Проверить">
                <text class="message"></text>


            </form>
        </td>
    <tr>
        <td class="content-div">
            <table id="result-table">
                <tr class="results">
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Время</th>
                    <th>Время исполнения</th>
                    <th>Результат попадания</th>
                </tr>

                <%--@elvariable id="collection" type="jiava.utl.LinkedList"--%>
                <c:forEach items="${collection}" var="col">
                    <tr class="results">
                        <th>${col.getX().toString().format("%.2f", col.getX()).replaceAll(",",".")}</th>
                        <th>${col.getY().toString().format("%.2f", col.getY()).replaceAll(",",".")}</th>
                        <th>${col.getR().toString().format("%.2f", col.getR()).replaceAll(",",".")}</th>
                        <th>${col.getTimezone().toString()}</th>
                        <th>${col.getScriptTime().toString()}</th>
                        <c:choose>
                            <c:when test="${col.isStatus().toString().trim()=='true'}">
                                <th style="color: green">${col.isStatus().toString().toUpperCase()}</th>
                            </c:when>
                            <c:otherwise>
                                <th style="color: red">${col.isStatus().toString().toUpperCase()}</th>
                            </c:otherwise>
                        </c:choose>
                    </tr>
                </c:forEach>
            </table>
        </td>
        <td>
            <button onclick="cleanTable()" type="clean_button" id="clear">Очистить</button>
        </td>
    </tr>


</table>

</body>

</html>