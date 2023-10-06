function validateInput() {
    const option = document.getElementById('option').value;
    const inputValue = document.getElementById('input').value;
    const resultElement = document.getElementById('result');
    let regex;

    switch(option) {
        case 'email':
            regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            break;
        case 'phone':
            regex = /^\d{11}$/;
            break;
        case 'postcode':
            regex = /^\d{4}$/;
            break;
        default:
            resultElement.textContent = "Invalid Option";
            return;
    }

    if (regex.test(inputValue)) {
        resultElement.textContent = "Valid Input!";
    } else {
        resultElement.textContent = "Invalid Input!";
    }
}
