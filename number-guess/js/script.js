document.addEventListener('DOMContentLoaded', function() {
    let lower = 1;
    let upper = 10;
    let correct_ans;
    let chances;
    let chancesElement;
    let resultElement;
    let guessInput;
    let submitButton;

    function initializeGame() {
        correct_ans = Math.floor(Math.random() * (upper - lower + 1)) + lower;
        chances = 3;
        chancesElement = document.getElementById('chances');
        resultElement = document.getElementById('result');
        guessInput = document.getElementById('guess');
        submitButton = document.querySelector('button');
        chancesElement.textContent = `Chances left: ${chances}`;
        resultElement.textContent = "";
        guessInput.value = "";
        guessInput.disabled = false;
        submitButton.disabled = false;
    }

    function checkGuess() {
        let userGuess = parseInt(guessInput.value);

        if (isNaN(userGuess) || userGuess < lower || userGuess > upper) {
            resultElement.textContent = `Please enter a valid number between ${lower} and ${upper}.`;
            return;
        }

        if (userGuess === correct_ans) {
            resultElement.textContent = `Congratulations! You've guessed the correct number (${correct_ans})!`;
            disableInputAndButton();
        } else if (userGuess < correct_ans) {
            resultElement.textContent = `Correct answer is greater!`;
        } else {
            resultElement.textContent = `Correct answer is smaller!`;
        }

        chances--;

        if (chances === 0 && userGuess === correct_ans) {
            resultElement.textContent = `Congratulations! You've guessed the correct number (${correct_ans})!`;
            disableInputAndButton();
        } else if (chances === 0){
            resultElement.textContent = `Sorry, you've used all your chances. The correct answer was ${correct_ans}. You lose!`;
            disableInputAndButton();
        }

        chancesElement.textContent = `Chances left: ${chances}`;
    }

    function disableInputAndButton() {
        guessInput.disabled = true;
        submitButton.disabled = true;
    }

    function restartGame() {
        initializeGame();
    }

    initializeGame();

    document.querySelector('button').addEventListener('click', checkGuess);
    document.getElementById('restart').addEventListener('click', restartGame);
});
