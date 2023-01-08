let R = 1;
function setRForPlot(aR) {
    R = aR;
}

function setX(ev) {
    document.getElementById('input_form:value_x_hinput').value = ev.value;
    let event = new Event('change');
    document.getElementById('input_form:value_x_hinput').dispatchEvent(event);
}
function makeDot(x, y, r){
    let svgns = "http://www.w3.org/2000/svg",
        container = document.getElementById( 'svg-plot' );
    let circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'class', 'shot' );
    circle.setAttributeNS(null, 'cx', 150 + 30 * x);
    circle.setAttributeNS(null, 'cy', 150 - 30 * y);
    circle.setAttributeNS(null, 'r', 3);
    circle.setAttributeNS(null, 'style', 'fill: ' + isHit(x, y, r) + ';stroke-width: 0;' );
    container.appendChild(circle);
}

function isHit(x, y, r){
    if(isCircleZone(x, y, r) || isTriangleZone(x, y, r) || isRectangleZone(x, y, r)){
        return 'green';
    } else return 'red';
}

function isRectangleZone(x, y, r){
    return (x>=0) && (y>=0) && (x<=(0.5)*r) && (y <= r);
}

function isTriangleZone(x, y, r){
    return (x<=0 && y<=0 && y>=(-1)*x-r/2)
}

function isCircleZone(x, y, r){
    return (x*x + y*y <= r*r) && (x>=0) && (y<=0);
}

function isValid(x, y, r){
    return (x >= -3 && x <= 5 && y >= -3 && y <= 5 && r >= 1 && r <= 3);
}

function changingPlot() {
    let r = R * 30;
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
    $('#triangle').attr('points', (150 - r / 2) + ",150 150,150 150," + (150 + r / 2));
    $('#rectangle').attr('points', "150,150 150," + (150 - r) + " " + (150 + r/2) + "," + (150 - r) + " " + (150 + r/2) + ",150");
    $('#circle').attr('d', "M" + "150," + (150 + r) + " A" + r + "," + r + " 90 0,0 " + (150 + r) + ",150" + " L 150,150 Z");
}
