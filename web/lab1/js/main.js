let r = document.getElementById("r");
let x = document.getElementById("x");
let y = document.getElementById("y");
let table = document.getElementById("tbody");
// let cookies_data = (Cookies.get("data") !== undefined && Cookies.get("data") !== "") ? Cookies.get("data") : "";

function fieldsEmpty() {
    var isEmpty = false;

    if (!r.value) {
        r.style.borderBottom = "1px solid red";
        $('#messageR').text("Это поле обязательно для заполнения");
        isEmpty = true;
    } else $('#messageR').text("");

    if (!x.value) {
        x.style.borderBottom = "1px solid red";
        $('#messageX').text("Это поле обязательно для заполнения");
        isEmpty = true;
    } else $('#messageX').text("");

    if (!y.value) {
        y.style.borderBottom = "1px solid red";
        $('#messageY').text("Это поле обязательно для заполнения");
        isEmpty = true;
    } else $('#messageY').text("");
    return isEmpty;
}

function areValuesValid() {
    let isOK = true;
    x.style.borderBottom = "1px solid #ACACAC";
    y.style.borderBottom = "1px solid #ACACAC";
    r.style.borderBottom = "1px solid #ACACAC";

    if (isNaN(parseFloat(x.value)) || ![-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2].includes(parseFloat(x.value))) {
        x.style.borderBottom = "1px solid red";
        $('#messageX').text("Некорректный ввод");
        isOK = false;
    }
    if (isNaN(parseFloat(y.value)) || y.value.trim() === '' || y.value > 3 || y.value < -5){
        y.style.borderBottom = "1px solid red";
        $('#messageY').text("Некорректный ввод");
        isOK = false;
    }
    if (isNaN(parseFloat(r.value)) || r.value.trim() === '' || r.value > 4 || r.value < 1){
        r.style.borderBottom = "1px solid red";
        $('#messageR').text("Некорректный ввод");
        isOK = false;
    }

    return isOK;
}


$(document).ready(function () {
    $('[data-reset]').on('click', function (e) {
        e.preventDefault();
        console.log("here")
        $.ajax({
            url: "reset.php",
            async: true,
            type: "POST",
            data: {},
            cache: false,
            success: function(response) {
                table.innerHTML = `
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Выполнение</th>
                    <th>Время</th>
                </tr>
                `
            },
            error: function(xhr) {
            }
        });
    })
})

$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
          e.preventDefault();
          let isOkFields = !fieldsEmpty();
          //if (!isOkFields) return;
          let isOkValues = areValuesValid();
          if (isOkFields && isOkValues) {
              $.ajax({
              url: "save.php",
              async: true,
              type: "POST",
              data: {
                  "x": x.value,
                  "y": y.value,
                  "r": r.value
              },
              cache: false,
              success: function(response) {
                let table = document.getElementById("tbody");
                table.insertAdjacentHTML('beforeend', response);
              },
              error: function (jqXHR, exception) {
                  var msg = '';
                  if (jqXHR.status === 0) {
                      msg = 'Not connect.\n Verify Network.';
                  } else if (jqXHR.status == 404) {
                      msg = 'Requested page not found. [404]';
                  } else if (jqXHR.status == 500) {
                      msg = 'Internal Server Error [500].';
                  } else if (exception === 'parsererror') {
                      msg = 'Requested JSON parse failed.';
                  } else if (exception === 'timeout') {
                      msg = 'Time out error.';
                  } else if (exception === 'abort') {
                      msg = 'Ajax request aborted.';
                  } else {
                      msg = 'Uncaught Error.\n' + jqXHR.responseText;
                  }
                  alert(msg);
              }
          });
      }
    })
});

$(document).ready(function () {
    $.ajax({
        url: "restore.php",
        async: true,
        type: "POST",
        success: function (response){
            let table = document.getElementById("tbody");
            table.insertAdjacentHTML('beforeend', response);
        }
    })
})

