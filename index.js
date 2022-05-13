const ALPHA = 0.5;
let lastAx = 0;

// Acceleration threshold
const ACC_TH = 6;
let isPlaying = false;
let audio;
const startBtns = document.getElementsByClassName('answer-button');

const soundsMap = {
    whip: new Audio('http://www.fun-lover.com/music/wavs/whip2.wav'),
    shame: new Audio('./shame.mp3'),
}




document.body.onclick = (e) => {
    console.log(e);
    console.log(e.target.id);
    audio = soundsMap[e.target.id];
    for (btn of startBtns) {
        btn.style.display = "none";
    }
    if (DeviceOrientationEvent && typeof (DeviceOrientationEvent.requestPermission) === "function") {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response == 'granted') {
                    window.addEventListener("devicemotion", onMotion);
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener("devicemotion", onMotion);
    }
};


const playSound = () => {
    isPlaying = true;
    document.body.style.backgroundColor = "red";
    audio.play();
    setTimeout(() => {
        document.body.style.backgroundColor = "white";
        isPlaying = false;
    }, 1000);
}

function onMotion(ev) {
    const ax = ALPHA * ev.acceleration.x + (1 - ALPHA) * lastAx;
    lastAx = ax;
    if (
        (Math.abs(ax) > ACC_TH) && !isPlaying
    ) {
        playSound();
    }
}
