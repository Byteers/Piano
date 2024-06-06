// Select elements
const pianoKeysEl = document.querySelectorAll(".piano-keys .key");
const volumeSliderEl = document.querySelector(".volume-slider input");
const keyTogglerEl = document.querySelector(".keys-checkbox input");

// Preload audio files
const audioFiles = {};
const allKeys = Array.from(pianoKeysEl).map(key => key.dataset.key);

allKeys.forEach(key => {
    const audio = new Audio(`tunes/${key}.wav`);
    audioFiles[key] = audio;
});

// Function to play tune
const playTune = (key) => {
    const audio = audioFiles[key];
    if (audio) {
        audio.currentTime = 0;  // Reset audio to start
        audio.play();

        // Adding class to the active key
        const clickedKey = document.querySelector(`[data-key="${key}"]`);
        clickedKey.classList.add("active");
        // Timeout to remove active class
        setTimeout(() => {
            clickedKey.classList.remove("active");
        }, 100);
    }
};

// Event to get the key pressed by mouse
pianoKeysEl.forEach(key => {
    key.addEventListener("click", () => playTune(key.dataset.key));
});

// Function to handle volume
const handleVolume = (e) => {
    const volume = e.target.value;
    Object.values(audioFiles).forEach(audio => audio.volume = volume);
};

// Function to handle toggle
const handleToggle = () => {
    pianoKeysEl.forEach(key => key.classList.toggle("hide"));
};

// Function to handle key press
const pressedKey = (e) => {
    if (allKeys.includes(e.key)) {
        playTune(e.key);
    }
};

// Event listeners
keyTogglerEl.addEventListener("click", handleToggle);
volumeSliderEl.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
