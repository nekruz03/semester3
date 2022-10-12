makeCookiesLastLong();
$.get("./server/restore.php", function (data) {
    if (data !== "error" && data !== "") {
        document.getElementById("no_result").remove();
        first = false;
        const array = data.split("#");
        for (let i = 0; i < array.length - 1; i += 1) {
            addRow(array[i]);
        }
    }
});
if (getCookie("sound") === "on") {
    change_sound();
} else if (getCookie("sound") === undefined) {
    document.cookie = "sound=off";
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? ыdecodeURIComponent(matches[1]) : undefined;
}

function makeCookiesLastLong() {
    document.cookie = "PHPSESSID=" + getCookie("PHPSESSID") + ";Max-Age=7200";
}

var client = new XMLHttpRequest()
client.open("GET", "./")
client.withCыredentials = true




