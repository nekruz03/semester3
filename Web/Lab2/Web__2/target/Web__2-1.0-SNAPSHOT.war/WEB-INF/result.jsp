<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Web_lab2</title>
    <link rel="stylesheet" href="./styles/stylesheet.css">
    <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
    <script src="./scripts/main.js"></script>
</head>
<body>
<table id="result-table2">
    <tbody>
    <tr class="results">
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Время</th>
        <th>Время исполнения</th>
        <th>Результат попадания</th>
    </tr>
    <%--        @elvariable id="collection" type="java.util.LinkedList"--%>
    <tr class="results">
        <th>${collection.getLast().getX().toString().format("%.2f", collection.getLast().getX()).replaceAll(",",".")}</th>
        <th>${collection.getLast().getY().toString().format("%.2f", collection.getLast().getY()).replaceAll(",",".")}</th>
        <th>${collection.getLast().getR().toString().format("%.2f", collection.getLast().getR()).replaceAll(",",".")}</th>
        <th>${collection.getLast().getTimezone().toString()}</th>
        <th>${collection.getLast().getScriptTime().toString()}</th>
        <c:choose>
            <c:when test="${collection.getLast().isStatus().toString().trim()=='true'}">
                <th style="color: green">${collection.getLast().isStatus().toString().toUpperCase()}</th>
            </c:when>
            <c:otherwise>
                <th style="color: red">${collection.getLast().isStatus().toString().toUpperCase()}</th>
            </c:otherwise>
        </c:choose>
    </tr>
    <tr>
        <td>
            <button id="clear2" onClick="window.location.replace('./..');" type="clean_button" onclick="">Main page</button>
        </td>
    </tr>
    </tbody>
</table>
</body>
</html>