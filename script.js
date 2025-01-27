const startBtn = document.getElementById('startBtn');
const startCardCon = document.getElementById('startCardCon');
const flashCardCon = document.getElementById('flashCardCon');
const mainCard = document.getElementById('main-card')
const audioBtn = document.getElementById('audioBtn');
const streakText = document.getElementById('streak');
const buttons = document.getElementsByClassName('option');
const audios = document.getElementsByClassName('audio')
console.log(audios.length)
const correctColor = '#4beb50'
const wrongColor = '#F98888'

let streak = 0;
let curAudio;

const thaiLetters = ['ก','ข','ฃ','ค','ฅ','ฆ','ง','จ','ฉ','ช',
'ซ','ฌ','ญ','ฎ','ฏ','ฐ','ฑ','ฒ','ณ','ด','ต','ถ','ท','ธ','น',
'บ','ป','ผ','ฝ','พ','ฟ','ภ','ม','ย','ร','ฤ','ล','ฦ',
'ว','ศ','ษ','ส','ห','ฬ','อ','ฮ'];

startBtn.addEventListener('click', () => {
    startCardCon.classList.add("hidden");
    streakText.classList.remove("hidden");
    newFlashCard();
});

// Attach event listeners to buttons once
for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    btn.addEventListener('click', () => optionBtnOnClick(btn));
}

audioBtn.addEventListener('click', () => {
    if (curAudio) {
        playAudio(curAudio);
    }
});

function playAudio(audio) {
    for (const a of audios) {
        console.log(a);
        if (!a.paused && !a.ended) {
            a.pause()
        }
    }
    audio.play();
}

function newFlashCard() {
    if (flashCardCon.classList.contains("hidden")) {
        flashCardCon.classList.remove("hidden");
    }

    // Select a correct letter and its corresponding audio
    const correctLetter = thaiLetters[getRandomInt(thaiLetters.length)];
    curAudio = document.getElementById(correctLetter);

    // Generate unique random letters for options
    const randomLetters = new Set([correctLetter]);
    while (randomLetters.size < buttons.length) {
        randomLetters.add(thaiLetters[getRandomInt(thaiLetters.length)]);
    }

    // Shuffle the options
    const letterArray = [...randomLetters];
    letterArray.sort(() => Math.random() - 0.5);

    // Assign letters to buttons
    for (let i = 0; i < buttons.length; i++) {
        let btn = buttons[i];
        btn.textContent = letterArray[i];
        btn.style.backgroundColor = 'transparent';
    }

    // Play the audio
    playAudio(curAudio);
}

function optionBtnOnClick(btn) {
    if (btn.textContent === curAudio.id) {
        // Correct answer
        playAudio(document.getElementById('correct'));
        flashBackGround(correctColor,mainCard)
        streak++;
        streakText.textContent = `Streak: ${streak}`;
        newFlashCard();
    } else {
        // Incorrect answer
        btn.style.backgroundColor = wrongColor; // Highlight incorrect button
        playAudio(document.getElementById('wrong'));
        flashBackGround(wrongColor,mainCard)
        streak = 0;
        streakText.textContent = `Streak: ${streak}`;
    }
}

function flashBackGround(color, elem, duration = 1000) {
    let originalColor = flashCardCon.style.backgroundColor;

    elem.style.backgroundColor = color;

    setTimeout(() => {
        elem.style.backgroundColor = originalColor;
    }, duration);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Utility to wait for audio to finish (not used directly in this setup but helpful for expansion)
function waitForAudio(audioElem) {
    return new Promise((resolve) => {
        audioElem.addEventListener('ended', resolve, { once: true });
    });
}

// Local Storage for High Score (Optional Implementation)
function updateHighScore() {
    const highScore = localStorage.getItem('highStreak') || 0;
    if (streak > highScore) {
        localStorage.setItem('highStreak', streak);
        console.log(`New high score: ${streak}`);
    }
}
