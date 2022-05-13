const ALPHA = 0.5;
let lastAx = 0;

// Acceleration threshold
const ACC_TH = 6;

const soundsMap = {
    WHIP: new Audio('http://www.fun-lover.com/music/wavs/whip2.wav'),
    SHAME: new Audio('./shame.mp3'),
}
let isPlaying = false;
const audio = new Audio('http://www.fun-lover.com/music/wavs/whip2.wav');
const startBtn = document.getElementById('start');

window.addEventListener("devicemotion", onMotion);

startBtn.onclick = () => { startBtn.style.display = "none" };


const playWhipSound = () => {
    isPlaying = true;
    document.body.style.backgroundColor = "red";
    audio.play();
    setTimeout(() => {
        document.body.style.backgroundColor = "white";
        isPlaying = false;
    }, 2000);
}

function onMotion(ev) {
    const ax = ALPHA * ev.acceleration.x + (1 - ALPHA) * lastAx;
    lastAx = ax;
    if (
        (Math.abs(ax) > ACC_TH) && !isPlaying
    ) {
        playWhipSound();
    }
}
