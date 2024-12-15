const buttonHoverSound = new Audio('./assets/blip.mp3');
const buttonClickSound = new Audio('./assets/explode.mp3');

let audioEnabled = false;

function enableAudio() {
    if (!audioEnabled) {
        audioEnabled = true;
        console.log('Audio enabled after user interaction.');
    }
}

function playSound(sound) {
    if (audioEnabled) {
        sound.currentTime = 0; 
        sound.play().catch((error) => {
            console.error('Error playing sound:', error);
        });
    }
}

function addSoundEffects() {
    document.addEventListener('click', enableAudio); 
    document.querySelectorAll('button, a').forEach((element) => {
        element.addEventListener('mouseover', () => playSound(buttonHoverSound));
        element.addEventListener('click', () => playSound(buttonClickSound));
    });
}

window.addEventListener('DOMContentLoaded', addSoundEffects);
