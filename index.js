const ALPHA = 0.5;
let lastAx = 0;

// Acceleration threshold
const ACC_TH = 6;

window.addEventListener("devicemotion", onMotion);

const playWhipSound = () => {
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
        document.body.style.backgroundColor = "white";
    }, 2000);
}

const playWhipSoundMax = () => {
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
        document.body.style.backgroundColor = "yellow";
    }, 2000);
}

function onMotion(ev) {
    playWhipSound();
    const ax = ALPHA * ev.acceleration.x + (1 - ALPHA) * lastAx;
    lastAx = ax;
    if (
        Math.abs(ax) > ACC_TH
    ) {
        playWhipSoundMax();
    }
}