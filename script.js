const words = ['apple', 'banana', 'bag', 'kiss', 'book', 'cherry'];
const container = document.querySelector('div.word');
const rightAnswer = document.querySelector('.correct-count');
const wrongAnswer = document.querySelector('.wrong-count');
const mistakes = document.querySelector('.word-mistakes');
const timerDisplay = document.querySelector('#timer');
let currentWord = '';
let currentLetter = 0;
let totalCorrect = 0;
let totalWrong = 0;
let currentMistakes = 0;
let letterCondition = [];
let timer;
let totalSeconds = 30;


function getRandom() {
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    currentWord = getRandom();
    container.innerHTML = '';
    letterCondition = [];
    for (let letter of currentWord) {
        const span = document.createElement('span');
        span.textContent = letter;
        container.appendChild(span);
        letterCondition.push('');
    }
    currentLetter = 0;
    currentMistakes = 0;
    updateMistakes();
}


function startGame() {
    displayWord();
    startTimer();
    document.addEventListener('keydown', pressKey);
}

function startTimer() {
    timer = setInterval(() => {
        totalSeconds--;
        updateTimer(totalSeconds);
        if (totalSeconds <= 0) {
            clearInterval(timer);
        }
    }, 1000);
}

function updateTimer(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingseconds = seconds % 60;
    timerDisplay.textContent = `${minutes <10 ? '0' + minutes:minutes}:${remainingseconds <10 ? '0' + remainingseconds:remainingseconds}`;

}

function pressKey(event) {
    const inputLetter = event.key;

    if (inputLetter === currentWord[currentLetter]) {
        const spans = container.querySelectorAll('span');
        spans[currentLetter].classList.add('c');
        spans[currentLetter].classList.remove('w');
        letterCondition[currentLetter] = 'correct';
        currentLetter++;

        if (currentLetter === currentWord.length) {
            totalCorrect++;
            rightAnswer.textContent = totalCorrect;
            if (totalCorrect === 5) {
                alert('Ура! Вы выиграли!');
                restartGame();
                return;
            }
            displayWord();
        }
    } else {
        const spans = container.querySelectorAll('span');
        spans[currentLetter].classList.add('w');
        letterCondition[currentLetter] = 'wrong';
        currentMistakes++;
        updateMistakes();
        totalWrong++;
        wrongAnswer.textContent = totalWrong;

        if (totalWrong === 5) {
            alert('Вы проиграли! Игра завершена!');
            restartGame();
            return;
        }
    }
}


function updateMistakes() {
    mistakes.textContent = currentMistakes;
}


function restartGame() {
    updateTimer(totalSeconds);
    clearInterval(timer);
    totalCorrect = 0;
    totalWrong = 0;
    currentMistakes = 0;
    totalSeconds = 30;
    startGame();
}

startGame();
updateTimer(totalSeconds);