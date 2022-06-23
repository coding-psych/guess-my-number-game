'use strict';

// ----------Const/Variable Data---------------------------------------------

// Username
let userName = document.querySelector('.username');
let userNameAlert = document.querySelector('.username-alert');

// Buttons
const letsGoBtn = document.querySelector('.lets-go');
const playBtn = document.querySelector('.play');
const guessBtn = document.querySelector('.guess');
const playAgainBtn = document.querySelector('.play-again');
const retryBtn = document.querySelector('.retry');
const anotherChallengeBtn = document.querySelector('.another-challenge');
const resetBtn = document.querySelector('.reset-buttons');

// Game Data
let secretNumber = document.querySelector('.secret-number');
let inputGuess = document.querySelector('.guess-input');
let gameMessage = document.querySelector('.robot-message');
let guessedContainer = document.querySelector('.guessed-numbers-container');
let guessed = document.createElement('p');
let highScore = 0;
let highScoreValue = document.querySelector('.high-score');
let score = 0;
let scoreValue = document.querySelector('.score');
let lives = 20;
let livesValue = document.querySelector('.lives-count');
let answer;

// ----------Functions-------------------------------------------------------

// Change Display to Block
const displayBlock = function (element, display) {
  Number((document.querySelector(element).style.display = display));
};

// Generate Random Number
function randomNumberGenerate() {
  let range = Number(
    document.querySelector('input[name="select-challenge"]:checked').value
  );
  return Math.trunc(Math.random() * range) + 1;
}

// Check if Game is Over
function checkIsGameOver(lives) {
  if (lives === 0) {
    setTimeout(function () {
      gameMessage.style.opacity = 0;
      setTimeout(function () {
        gameMessage.innerHTML = 'Sorry, Game Over..';
        gameMessage.style.opacity = 1;
      }, 250);
    });
    guessBtn.disabled = true;
    playAgainBtn.disabled = true;
    resetBtn.style.opacity = 1;
    document.body.style.animation = 'blink-red 1.5s infinite';
    document.querySelector('.robot-image3').src = './images/crying-robot.png';
  }
}

// Checking, Getting, Storing High Score
function checkHighScore(score) {
  const highScore = JSON.parse(localStorage.getItem('highScore'));
  if (score > highScore) {
    saveHighScore(score);
    showHighScore();
  }
}

function saveHighScore(score) {
  localStorage.setItem('highScore', score);
}

function showHighScore() {
  const highScore = JSON.parse(localStorage.getItem('highScore'));
  if (highScore == null) {
    highScoreValue.innerHTML = 0;
  } else {
    highScoreValue.innerHTML = highScore;
  }
}

// Show Guessed Numbers
function showGuessedNumbers(guessedNumbers) {
  numbersGuessed.style.opacity = 1;
}

// Clear Guessed Numbers
function clearGuessedNumbers() {
  guessed.innerHTML = '';
}

// Reset Score & Lives
function resetScoreLives() {
  score = 0;
  scoreValue.innerHTML = score;
  lives = 20;
  livesValue.innerHTML = lives;
}

// Reset Guess Number
function resetGuessNumber() {
  guessBtn.disabled = false;
  gameMessage.innerHTML = `Guess My Number, ${userName.value}..`;
}

// Hide Retry & Another Challenge Buttons {
function hideButtons() {
  resetBtn.style.opacity = 0;
}

// Not Worthy
function notWorthyAction() {
  const element = document.querySelector('.not-worthy-container');
  element.classList.add('active');
}

// Check Guess Logic
function checkGuess(userGuess) {
  if (userGuess < answer) {
    setTimeout(function () {
      gameMessage.style.opacity = 0;
      setTimeout(function () {
        gameMessage.innerHTML =
          gameMessage.innerHTML = `${userName.value}, Your Guess is too Low..`;
        gameMessage.style.opacity = 1;
      }, 250);
    });
    lives--;
    checkIsGameOver(lives);
    livesValue.innerHTML = lives;
    guessed.innerHTML = userGuess + ' ' + guessed.innerHTML;
    guessedContainer.appendChild(guessed);
  } else if (userGuess > answer) {
    setTimeout(function () {
      gameMessage.style.opacity = 0;
      setTimeout(function () {
        gameMessage.innerHTML =
          gameMessage.innerHTML = `${userName.value}, Your Guess is too High..`;
        gameMessage.style.opacity = 1;
      }, 250);
    });
    lives--;
    checkIsGameOver(lives);
    livesValue.innerHTML = lives;
    guessed.innerHTML = userGuess + ' ' + guessed.innerHTML;
    guessedContainer.appendChild(guessed);
  } else if (userGuess == answer) {
    document.body.style.animation = 'blink-green 1.5s infinite';
    document.querySelector('.robot-image3').src = './images/happy-robot.png';
    setTimeout(function () {
      gameMessage.style.opacity = 0;
      setTimeout(function () {
        gameMessage.innerHTML =
          gameMessage.innerHTML = `You guessed it right, ${userName.value}`;
        gameMessage.style.opacity = 1;
      }, 250);
    });
    secretNumber.innerHTML = userGuess;
    guessBtn.disabled = true;
    playAgainBtn.disabled = false;
    score++;
    scoreValue.innerHTML = score;
    checkHighScore(score);
  }
}

// Keyboard Event Listeners
userName.addEventListener('keydown', event => {
  if (event.keyCode == 13) {
    letsGoBtn.click();
  }
});

inputGuess.addEventListener('keydown', event => {
  if (event.keyCode == 13) {
    guessBtn.click();
  }
});

// ----------Click Buttons---------------------------------------------------

// Click Button - Let's Go (from initial screen)
letsGoBtn.addEventListener('click', function () {
  userName.onkeydown = function () {
    userNameAlert.style.opacity = 0;
  };
  if (userName.value === '') {
    userNameAlert.style.opacity = 1;
    document.querySelector('.robot-image1').src = './images/crying-robot.png';
  } else if (userName.value === 'Boris Johnson') {
    notWorthyAction();
  } else if (userName.value.length >= 1) {
    document.querySelector(
      '.user-welcome'
    ).innerHTML = `Welcome, ${userName.value}.`;
    displayBlock('.initial-screen', 'none');
    displayBlock('.greeting-screen', 'grid');
    displayBlock('.game-screen', 'none');
  }
  localStorage.removeItem('highScore');
});

// Click Button - Play (from welcome screen)
playBtn.addEventListener('click', function () {
  displayBlock('.initial-screen', 'none');
  displayBlock('.greeting-screen', 'none');
  displayBlock('.game-screen', 'grid');
  answer = randomNumberGenerate();
  showHighScore();
  gameMessage.innerHTML = `Guess My Number, ${userName.value}..`;
});

// Click Button - Play Again
playAgainBtn.addEventListener('click', function () {
  playAgainBtn.disabled = true;
  secretNumber.innerHTML = '?';
  clearGuessedNumbers();
  resetGuessNumber();
  answer = randomNumberGenerate();
  inputGuess.value = '';
  document.body.style.animation = '';
  document.querySelector('.robot-image3').src = './images/normal-robot.png';
});

// Click Button - Retry
retryBtn.addEventListener('click', function () {
  hideButtons();
  clearGuessedNumbers();
  resetGuessNumber();
  resetScoreLives();
  answer = randomNumberGenerate();
  document.body.style.animation = '';
  document.querySelector('.robot-image3').src = './images/normal-robot.png';
});

// Click Button - Another Challenge
anotherChallengeBtn.addEventListener('click', function () {
  displayBlock('.initial-screen', 'none');
  displayBlock('.greeting-screen', 'grid');
  displayBlock('.game-screen', 'none');
  hideButtons();
  clearGuessedNumbers();
  resetGuessNumber();
  resetScoreLives();
  answer = randomNumberGenerate();
  document.body.style.animation = '';
  document.querySelector('.robot-image3').src = './images/normal-robot.png';
});

// ----------Game Logic------------------------------------------------------

// Click Button - Guess
guessBtn.addEventListener('click', function () {
  let userGuess = inputGuess.value;
  let numberRangeIdentifier = Number(
    document.querySelector('input[name="select-challenge"]:checked').value
  );

  // 1-10 Game
  if (numberRangeIdentifier === 10) {
    if (userGuess < 1 || userGuess > 10) {
      gameMessage.innerHTML = 'Enter A Number Between 1 to 10.';
    } else if (isNaN(userGuess)) {
      gameMessage.innerHTML = 'Please enter a number..';
    } else {
      checkGuess(userGuess);
    }
    inputGuess.value = '';

    // 1-20 Game
  } else if (numberRangeIdentifier === 20) {
    if (userGuess < 1 || userGuess > 20) {
      gameMessage.innerHTML = 'Please Enter A Number Between 1 to 20.';
    } else if (isNaN(userGuess)) {
      gameMessage.innerHTML = 'Please enter a number..';
    } else {
      checkGuess(userGuess);
    }
    inputGuess.value = '';

    //1-50 Game
  } else if (numberRangeIdentifier === 50) {
    if (userGuess < 1 || userGuess > 50) {
      gameMessage.innerHTML = 'Please Enter A Number Between 1 to 50.';
    } else if (isNaN(userGuess)) {
      gameMessage.innerHTML = 'Please enter a number..';
    } else {
      checkGuess(userGuess);
    }
    inputGuess.value = '';

    // 1-100 Game
  } else if (numberRangeIdentifier === 100) {
    if (userGuess < 1 || userGuess > 100) {
      gameMessage.innerHTML = 'Please Enter A Number Between 1 to 100.';
    } else if (isNaN(userGuess)) {
      gameMessage.innerHTML = 'Please enter a number..';
    } else {
      checkGuess(userGuess);
    }
    inputGuess.value = '';
  }
});