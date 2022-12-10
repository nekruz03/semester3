let x;
let y;
let r;
let prev = 1;


function formHandler(event){
    event.preventDefault();
    if (validateValues()){
        sendData();
    }
}

function validateValues(){
    let radioButtons1 = document.querySelectorAll('input[name="x-value"]');
    for (const radioButton of radioButtons1) {
        if (radioButton.checked) {
            x = radioButton.value;
            break;
        }
    }

    y = document.querySelector('input[name="y-value"]').value.replace(",", ".");

    let radioButtons2 = document.querySelectorAll('input[name="r-value"]');
    for (const radioButton of radioButtons2) {
        if (radioButton.checked) {
            r = radioButton.value;
            break;
        }
    }

    if ($.isNumeric(x) && $.isNumeric(y) && $.isNumeric(r) && y>(-1*5) && y<5){
        document.querySelector('.message').textContent = "";
        return true;
    }
    else document.querySelector('.message').textContent = " ERROR!";
    return false;
}
function sendData(){
    let timezone = new Date().getTimezoneOffset();
    console.log(timezone);
    let data = "r=" + encodeURIComponent(r) + "&x=" + encodeURIComponent(x) + "&y=" + encodeURIComponent(y) + "&timezone=" + encodeURIComponent(timezone);
    let xhr = new XMLHttpRequest();
    xhr.open("POST",   "controller", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                makeDot();
                moveDot(r);
                window.location = document.URL + 'result.jsp';
            }
        }
    }
}
function svgHandler(event){
    const svg = document.querySelector('svg');
    const rect = svg.getBoundingClientRect();
    r = document.querySelector('input[name="r-value"]').value;
    x = ((event.clientX - rect.left - 150)*(r/2)/50).toFixed(2);
    y = (((-1)*(event.clientY - rect.top - 150))*(r/2)/50).toFixed(2);
    sendData(x, y, r);
}

function makeDot(){
    let svgns = "http://www.w3.org/2000/svg",
        container = document.querySelector('svg');
    let circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'class', 'shot');
    circle.setAttributeNS(null, 'cx', 150 + 100 * x/r);
    circle.setAttributeNS(null, 'cy', 150 - 100 * y/r);
    circle.setAttributeNS(null, 'r', 3);
    circle.setAttributeNS(null, 'style', 'fill: red; stroke-width: 0;');
    container.appendChild(circle);
}


function moveDot(prev){
    let cur = 1;
    let shots = document.querySelectorAll(".shot")
    let cx = shots.item(shots.length-1).getAttribute('cx');
    let cy = shots.item(shots.length-1).getAttribute('cy');
    console.log(shots);
    console.log(cx, cy);
    shots.item(shots.length-1).setAttributeNS(null, 'cx', (cx - 150)*prev/cur + 150);
    shots.item(shots.length-1).setAttributeNS(null, 'cy', 150 - (150 - cy)*prev/cur);
}

function cleanTable(){
    let data2 = "clean_status=true";
    let xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "cleaner", true);
    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr2.send(data2);
    xhr2.onreadystatechange = function (){
        if (xhr2.readyState === 4){
            if (xhr2.status === 200){
                window.location.reload();
            }
        }
    }
}
function changingPlot() {
    let r = parseFloat(document.getElementById('form: r-value').value) * 30;
    $('#circleX_1').attr('cx', 150 - r);
    $('#circleX_2').attr('cx', 150 - r / 2);
    $('#circleX_3').attr('cx', 150 + r / 2);
    $('#circleX_4').attr('cx', 150 + r);
    $('#circleY_1').attr('cy', 150 - r);
    $('#circleY_2').attr('cy', 150 - r / 2);
    $('#circleY_3').attr('cy', 150 + r / 2);
    $('#circleY_4').attr('cy', 150 + r);
    $('#nameX_1').attr('x', 150 - r - 10);
    $('#nameX_2').attr('x', 150 + r - 5);
    $('#nameY_1').attr('y', 150 - r + 2.5);
    $('#nameY_2').attr('y', 150 + r + 2.5);
    $('#triangle').attr('points', (150 + r / 2) + ",150 150, " + (150 + r / 2) + " 150,150");
    $('#rectangle').attr('points', "150,150 150," + (150 + r / 2) + " " + (150 - r) + "," + (150 + r / 2) + " " + (150 - r) + ",150");
    $('#circle').attr('d', "M" + "150," + (150 - r) + " A" + r + "," + r + " 90 0,1 " + (150 + r) + ",150" + " L 150,150 Z");
}