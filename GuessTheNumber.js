let randomNumber = parseInt((Math.random() * 100) + 1);

const submit = document.querySelector('#sub');
const userInput = document.querySelector('#guessField');
const GuessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

let previousGuesses = [];
let numGuesses = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a number greater than 1!');
    } else if (guess > 100) {
        alert('Please enter a number smaller than 100!');
    } else {
        previousGuesses.push(guess);

        if (numGuesses === 10) {
            displayGuesses(guess);
            displayMessage(`Game Over! Number was ${randomNumber}`);
            endGame();
        } else {
            displayGuesses(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`You guessed correctly! Number is ${randomNumber}`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage("Too low! Try Again!");
    } else if (guess > randomNumber) {
        displayMessage("Too High! Try Again!");
    }
}

function displayGuesses(guess) {
    userInput.value = '';
    GuessSlot.innerHTML += `${guess} `;
    numGuesses++;
    remaining.innerHTML = `${11 - numGuesses}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    
    const newGameButton = document.createElement('button');
    newGameButton.id = 'newGame';
    newGameButton.innerHTML = 'Start New Game';
    newGameButton.classList.add('button');

    const startOver = document.querySelector('.resultPress'); 
    startOver.appendChild(newGameButton);
    
    playGame = false;

    newGameButton.addEventListener('click', function () {
        randomNumber = parseInt((Math.random() * 100) + 1);
        previousGuesses = [];
        numGuesses = 1;
        GuessSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${11 - numGuesses}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(newGameButton); 
        playGame = true;
    });
}
