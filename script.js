const startBtn = document.getElementById('startBtn');
const startCardCon = document.getElementById('startCardCon');
const flashCardCon = document.getElementById('flashCardCon');
const audioBtn = document.getElementById('audioBtn');
const streakText = document.getElementById('streak');
const buttons = document.getElementsByClassName('option');

let streak = 0;
let curAudio;

const thaiLetters = ['ก','ข','ฃ','ค','ฅ','ฆ','ง','จ','ฉ','ช',
'ซ','ฌ','ญ','ฎ','ฏ','ฐ','ฑ','ฒ','ณ','ด','ต','ถ','ท','ธ','น',
'บ','ป','ผ','ฝ','พ','ฟ','ภ','ม','ย','ร','ล','ว','ศ','ษ','ส',
'ห','ฬ','อ','ฮ'];

startBtn.addEventListener('click', ()=> {
    startCardCon.classList.add("hidden");
    streakText.classList.remove("hidden");
    newFlashCard();
});

for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    btn.addEventListener('click', () => optionBtnOnClick(btn));
}

function newFlashCard() {
    if (flashCardCon.getAttribute("class").includes("hidden")) {
        flashCardCon.classList.remove("hidden");
    }

    let correctLetter = thaiLetters[getRandomInt(thaiLetters.length)];
    let correctButton = document.getElementById('option'+(getRandomInt(3)+1));
    curAudio = document.getElementById(correctLetter);
    for (let i = 0; i < buttons.length; i++) {
        let btn = buttons[i];
        btn.style.backgroundColor = 'white';
        if (btn.id === correctButton.id) {
            btn.textContent = correctLetter;
        } else {
            btn.textContent = thaiLetters[getRandomInt(thaiLetters.length)];
        }
    }
    curAudio.play();

    audioBtn.addEventListener('click', () => {
        curAudio.play();
    })

}

function optionBtnOnClick(btn) {
    console.log(btn.textConent,
        curAudio.getAttribute("id"),
        );
    if (btn.textContent === curAudio.getAttribute("id")) {
        //clicked correct button
        document.getElementById('correct').play();
        streak++;
        streakText.textContent = streak;
        newFlashCard();
    } else {
        //clicked wrong button
        btn.style.backgroundColor = '#F98888';
        document.getElementById('wrong').play();
        streak = 0;
        streakText.textContent = streak;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function sleepUntilAudioStops(audioElem) {
    var start = new Date().getTime();
    while (true) {
        if (audioElem.paused) {
            console.log('audio paused');
            break;
        } else if ((new Date().getTime() - start) > 10000) {
            break;
        }
    }
}

