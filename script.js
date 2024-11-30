const words = ['apple', 'banana', 'bag', 'kiss', 'book', 'cherry'];
const container = document.querySelector('div.word');
const rightAnswer = document.querySelector('.correct-count');
const wrongAnswer = document.querySelector('.wrong-count');
const mistakes = document.querySelector('.word-mistakes');
let currentWord = '';
let currentLetter = 0;
let totalCorrect = 0;
let totalWrong = 0;
let currentMistakes = 0;

function getRandom() {
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    currentWord = getRandom();
    container.innerHTML = '';
    for (let letter of currentWord) {
        const span = document.createElement('span');
        span.textContent = letter;
        container.appendChild(span);
    }
    currentLetter = 0;
    currentMistakes = 0;
    updateMistakes();
}


function startGame() {
    displayWord();
    document.addEventListener('keydown', pressKey);
}

function pressKey(event) {
    const inputLetter = event.key;

    if (inputLetter === currentWord[currentLetter]) {
        const spans = container.querySelectorAll('span');
        spans[currentLetter].classList.add('c');
        currentLetter++;

        if (currentLetter === currentWord.length) {
            totalCorrect++;
            rightAnswer.textContent = parseInt(rightAnswer.textContent) + 1;
            displayWord();
        }
    } else {
        const spans = container.querySelectorAll('span');
        spans[currentLetter].classList.add('w');
        currentMistakes++;
        updateMistakes();
        totalWrong++;
        wrongAnswer.textContent = totalWrong;

    }
}

function updateMistakes() {
    mistakes.textContent = currentMistakes;
}
startGame();