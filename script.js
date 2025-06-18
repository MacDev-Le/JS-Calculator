
// Reference display element
const display = document.getElementById('display');

// Track if we have performed a calculation

let justCalculated = false;

// Function to append to display

function appendToDisplay(value) {
    console.log('Button pressed:', value);
    // If a user just calculated, remove when they calculate again
    let currentValue = display.value;

    if (justCalculated && !isNaN(value)) {
        display.value = value;
        justCalculated = false;
        return;  //End the function
    }

    // If the current display shows 0 and user enters a number, replace the 0 with the number pressed
    if (currentValue === '0' && !isNaN(value)) {
        display.value = value;
    } else if (currentValue === '0' && value === '.'){
        display.value = currentValue + value;
    } else {
        display.value = currentValue + value;
    }
    // "else if" above = If the current display shows 0 and the user enters decimal, keep the 0

    // Reset the justCalculated flag when the user starts typing
    justCalculated = false;

    console.log('Display updated to: ', display.value);

}

function clearDisplay() {
    console.log('Clear button pressed.');

    alert('Clear button was clicked');
}

function deleteLast() {
    console.log('Delete button pressed.');

    let currentValue = display.value;

    // If there is only one character or its 0, reset to 0

    if (currentValue.length <= 1 || currentValue === '0') {
        display.value = '0';
    } else {
        display.value = currentValue.slice(0, -1);  // If not, remove the last character
    }

    alert('Backspace button was clicked');
}

function calculate() {
    console.log('Equals button pressed.');

    alert('Equals button was clicked');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Calculator loaded successfully');
    console.log('Display elemt', display);

    // Test if we can access display

    if (display) {
        console.log("Current display value: ", display.value);
    } else {
        console.log('Display element not found');
    }
})