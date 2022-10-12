let get_X;
let get_Y;
let get_R;
let first = true;
const SAD_CAT = "data/9b81048132e5f84eb054c7c9b25e0674.gif";
const HAPPY_CAT = "data/b78dc35cd99fe399b4b5a7bcf318ae97.gif";


function onSubmit() {
    if (validateForm()) {
        let xRadioButtons = document.getElementsByName("x_value");
        for (let xRadioButton of xRadioButtons) {
            if (xRadioButton.checked) {
                get_X = xRadioButton.value;
                break;
            }
        }

        let rRadioButtons = document.getElementsByName("r_value");
        for (let rRadioButton of rRadioButtons) {
            if (rRadioButton.checked) {
                get_R = rRadioButton.value;
                break;
            }
        }
        get_Y = document.getElementById("y_value").value.replace(/,/, '.');
        $.get("./server/main.php", {x : get_X, y: get_Y, r: get_R}, function (data) {
            if (data !== "error") {
                addRow(data);
                addCircle();
            }
        });

    }
}


function validateForm() {
    const yValue = document.getElementById("y_value").value.trim().replace(/,/, '.');
    if (yValue === "") {
        alert("Заполните поле Значение Y!!!");
        return false;
} else if (isNaN(Number(yValue))) {
        alert("Поле Значение Y принимает только числа");
        return false;
} else if (yValue >= 5 || yValue <= -5) {
        alert("Значение Y не входит в установленные рамки");
        return false;
}
    else {
        alert("Форма успешно отправлена");
        return true;
    }
}

function addRow(data){
    let tbody = document.getElementById("result_table").getElementsByTagName('TBODY')[0];
    tbody.insertAdjacentHTML('beforeend', data);

    if (first) {
        first = false;
        document.getElementById("no_result").remove();
    }
    const result = $("#result_table tr td:last");
    let row = $("#result_table tr:last");
    if (result.text() === "Не попадает") {
        row.addClass("notGetIn");
    }
    else {
        row.addClass("getIn");
    }
}

function clearHistory(){
    if (!first) {
        $.get("./server/reset.php");
        first = true;
        let tbody = document.getElementById("result_table").getElementsByTagName('TBODY')[0];
        tbody.innerHTML = '<tr id="no_result"><th colspan="6">Нет результатов</th></tr>';

    }
}

function addCircle() {
    const x = $("#result_table tr:last td:nth-child(3)").text();
    const y = $("#result_table tr:last td:nth-child(4)").text();
    const r = $("#result_table tr:last td:nth-child(5)").text();
    const result = $("#result_table tr:last td:nth-child(6)").text();
    const x_base = 75;
    const y_base = 75;
    const r_base = 60 / r;
    let cy = y_base - r_base * y;
    let cx = x_base + r_base * x;
    cy = Math.min(150, cy);
    cy = Math.max(0, cy);
    cx = Math.min(150, cx);
    cx = Math.max(0, cx);
    const circle = document.getElementById("old_pointer");
    circle.setAttribute("visibility", "visible");
    circle.setAttribute("cx", cx.toString());
    circle.setAttribute("cy", cy.toString());
    if (result === "Не попадает") {
        circle.setAttribute("fill", "red");
        change_kitten(SAD_CAT);
        if (is_sound_on) {
            playAudio("data/nepravilno-poprobuy-esch-raz.mp3");
        }
    }
    else {
        circle.setAttribute("fill", "green");
        change_kitten(HAPPY_CAT);
        if (is_sound_on) {
            playAudio("data/-est-probitie-wot.mp3");
        }
    }
}





