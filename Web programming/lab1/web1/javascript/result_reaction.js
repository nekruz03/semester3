const audio = new Audio;
let is_sound_on = false;

function change_kitten(src) {
    const kit = document.querySelector("img.kitten");
    kit.setAttribute("src", src);
}

function playAudio(url) {
    audio.load();
    audio.src = url;
    audio.play();
}

function change_sound() {
    if (is_sound_on) {
        is_sound_on = false;
        document.getElementById("sound_img").setAttribute("src","data/Frame 1no_sound.svg");
        document.cookie = "sound=off";
    }
    else {
        is_sound_on = true;
        document.getElementById("sound_img").setAttribute("src","data/Frame 1sound.svg");
        document.cookie = "sound=on";
    }
}