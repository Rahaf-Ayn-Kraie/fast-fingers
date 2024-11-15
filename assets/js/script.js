'use strict';

const wordBank = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 
    'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money', 
    'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow', 
    'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 
    'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'phone', 
    'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada', 
    'velvet', 'potion', 'treasure', 'beacon', 'labyrinth', 'whisper', 'breeze', 
    'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 
    'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake', 
    'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer', 
    'butterfly', 'discovery', 'ambition', 'music', 'eagle', 'crown', 
    'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'door', 'bird', 
    'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework', 
    'beach', 'economy', 'interview', 'awesome', 'challenge', 'science', 
    'mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software', 
    'update', 'yellow', 'keyboard', 'window', 'beans', 'truck', 'sheep', 
    'blossom', 'secret', 'wonder', 'enchantment', 'destiny', 'quest', 'sanctuary', 
    'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 
    'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion', 
    'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort', 
    'mask', 'escape', 'promise', 'band', 'level', 'hope', 'moonlight', 'media', 
    'orchestra', 'volcano', 'guitar', 'raindrop', 'inspiration', 'diamond', 
    'illusion', 'firefly', 'ocean', 'cascade', 'journey', 'laughter', 'horizon', 
    'exploration', 'serendipity', 'infinity', 'silhouette', 'wanderlust', 
    'marvel', 'nostalgia', 'serenity', 'reflection', 'twilight', 'harmony', 
    'symphony', 'solitude', 'essence', 'melancholy', 'melody', 'vision', 
    'silence', 'whimsical', 'eternity', 'cathedral', 'embrace', 'poet', 'ricochet', 
    'mountain', 'dance', 'sunrise', 'dragon', 'adventure', 'galaxy', 'echo', 
    'fantasy', 'radiant', 'serene', 'legend', 'starlight', 'light', 'pressure', 
    'bread', 'cake', 'caramel', 'juice', 'mouse', 'charger', 'pillow', 'candle', 
    'film', 'jupiter'
];

const wordInput = document.querySelector('.word-input');
const wordPrompt = document.querySelector('.word-prompt');
const scoreDisplay = document.querySelector('.score');
const timerDisplay = document.querySelector('.time');
const startButton = document.querySelector('.start-button');
const restartButton = document.querySelector('.restart-button');
const gameOverModal = document.querySelector('.game-over-modal');
const finalScore = document.querySelector('.final-score');
const closeModalButton = document.querySelector('.close-modal');
const showScoresButton = document.querySelector('.show-scores-button');
const scoresList = document.querySelector('.scores-list');
const backgroundMusic = document.querySelector('.background-music');
const countdownDisplay = document.querySelector('#countdown'); 

let score = 0;
let currentWord = '';
let timeLeft = 120;
let intervalTimer;
let intervalCountdown;
let highScores = [];
let countdownStarted = false;
let countdownInterval;
let gameStarted = false;

function generateNewWord() {
    currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    wordPrompt.textContent = currentWord;
}

function startGame() {
    score = 0;
    timeLeft = 120;
    wordInput.value = '';
    wordPrompt.textContent = '';
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    startButton.style.display = 'none';
    restartButton.style.display = 'inline-block';
    countdownDisplay.style.display = 'block';
    countdownDisplay.textContent = 3;

    let countdown = 3;
    countdownInterval = setInterval(() => {
        countdown--;
        countdownDisplay.textContent = countdown > 0 ? countdown : 'Go!';
        if (countdown === 0) {
            clearInterval(countdownInterval);
            setTimeout(startActualGame, 1000);
        }
    }, 1000);
}

function startActualGame() {
    gameStarted = true;
    countdownDisplay.style.display = 'none';
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;

    generateNewWord();

    wordInput.focus();

    intervalTimer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(intervalTimer);
            endGame();
        }
    }, 1000);

    wordInput.addEventListener('input', checkInput);
    backgroundMusic.play();
    backgroundMusic.volume = 0.1;
}

function checkInput() {
    if (wordInput.value === currentWord) {
        score++;
        scoreDisplay.textContent = score;
        generateNewWord();
        wordInput.value = '';
    }
}

function endGame() {
    clearInterval(intervalTimer);
    const date = new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
    });

    const maxScore = 10;
    const percentage = Math.round((score / maxScore) * 100);
    const finalScore = document.querySelector('.final-score');
    const gameDate = document.querySelector('.game-date');
    const gamePercentage = document.querySelector('.game-percentage');
    finalScore.textContent = score;
    gameDate.textContent = `Date: ${date}`;
    gamePercentage.textContent = `Percentage: ${percentage}%`;
    const gameOverModal = document.querySelector('.game-over-modal');
    gameOverModal.style.display = 'block';
    const backgroundMusic = document.querySelector('.background-music');
    backgroundMusic.pause();
    saveHighScore(date, score, percentage);
}

function saveHighScore() {
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    if (highScores.length > 5) highScores = highScores.slice(0, 5);

    scoresList.innerHTML = '';
    highScores.forEach(score => {
        const li = document.createElement('li');
        li.textContent = score;
        scoresList.appendChild(li);
    });
}

restartButton.addEventListener('click', () => {
    clearInterval(intervalTimer);

    timeLeft = 9;
    score = 0;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    backgroundMusic.play(); 

    gameOverModal.style.display = 'none';
    startButton.style.display = 'none';
    restartButton.style.display = 'inline-block';

    wordInput.value = '';
    wordPrompt.textContent = '';

    startGame();
});

startButton.addEventListener('click', startGame);
showScoresButton.addEventListener('click', () => {
    scoresList.innerHTML = '';
    if (highScores.length === 0) {
      scoresList.innerHTML = '<li>No scores yet!</li>';
    } else {
      highScores.forEach(({ date, score, percentage }) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Date:</strong> ${date}, <strong>Score:</strong> ${score}, <strong>Percentage:</strong> ${percentage}%`;
        scoresList.appendChild(li);
      });
    }
    scoresPanel.style.display = 'block';
  });


closeScoresButton.addEventListener('click', () => {
    scoresPanel.style.display = 'none';
});