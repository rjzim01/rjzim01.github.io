document.addEventListener('DOMContentLoaded', function() {
    // Set the range
    let lower = 1;
    let upper = 10;

    // Generate a random number within the range
    let correct_ans = Math.floor(Math.random() * (upper - lower + 1)) + lower;

    // Update the UI with the range
    document.getElementById('lower').textContent = lower;
    document.getElementById('upper').textContent = upper;

    // Initialize the number of chances
    let chances = 3;

    function checkGuess() {
        let userGuess = parseInt(document.getElementById('guess').value);
        let resultElement = document.getElementById('result');

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

        if (chances === 0) {
            resultElement.textContent = `Sorry, you've used all your chances. The correct answer was ${correct_ans}. You lose!`;
            disableInputAndButton();
        }
    }

    function disableInputAndButton() {
        document.getElementById('guess').disabled = true;
        document.querySelector('button').disabled = true;
    }

    document.querySelector('button').addEventListener('click', checkGuess);
});
