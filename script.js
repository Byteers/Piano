// Select elements
const pianoKeysEl = document.querySelectorAll(".piano-keys .key");
const volumeSliderEl = document.querySelector(".volume-slider input");
const keyTogglerEl = document.querySelector(".keys-checkbox input");

// Initialize audio element
const audio = new Audio();
audio.src = "tunes/a.wav";

// Extract keys from the DOM
const allKeys = Array.from(pianoKeysEl).map(key => key.dataset.key);

// Function to play tune
const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play();

    // Adding class to the active key
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    // Timeout to remove active class
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 100);
};

// Event to get the key pressed by mouse
pianoKeysEl.forEach(key => {
    key.addEventListener("click", () => playTune(key.dataset.key));
});

// Function to handle volume
const handleVolume = (e) => {
    audio.volume = e.target.value;
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
