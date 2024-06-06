//select element
const pianoKeysEl = document.querySelectorAll(".piano-keys .key");
const volumeSliderEl = document.querySelector(".volume-slider input");
const keyTogglerEl = document.querySelector(".keys-checkbox input");

//audio file location
let audio = new Audio("/tunes/a.wav");

let allKeys = [];

//function to play tune
const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play();

    //adding class the active key
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    //timeout to remove active class
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 100)
};

//event to get the key pressed by mouse
pianoKeysEl.forEach(key => {
    //adding data key value to all keys array to avoid error
    allKeys.push(key.dataset.key)

    //calling playtune function when keys clicked
    key.addEventListener("click", () => playTune(key.dataset.key));
});

//function to handle volume
const handleVolume = (e) => {
    audio.volume = e.target.value;
};

//function to handle toggle
const handleToggle = (e) => {
    //to toggle hide class in each key
    pianoKeysEl.forEach(key => key.classList.toggle("hide"));
};

//function to handle key press
const pressedKey = (e) => {
    allKeys.includes(e.key) && playTune(e.key);
};

//event to handle volume slider
keyTogglerEl.addEventListener("click", handleToggle);

//event to handle volume slider
volumeSliderEl.addEventListener("input", handleVolume);

//event to handle key press by keyboard
document.addEventListener("keydown", pressedKey);
