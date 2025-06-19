
// Reference display element
const display = document.getElementById('display');

// Track if we have performed a calculation

let justCalculated = false;

// Smart Operator Handling

function isOperator(char) {
    return ['+','-','*','/'].includes(char);
}

// Get the last character in display.

function getLastChar() {
    return display.value.slice(-1);
}

// Equals: Add a function to safely evaluate calculations. "tryCatch" = expects an error and handles it. Show the user.

function safeEval(expression) {
    try {
        let jsExpression = expression
            .replace(/x/g,'*')
            .replace(/÷/g,'/');
        
        if (!/^[0-9+\-*/.()]+$/.test(jsExpression)){
            throw new Error('Invalid characters in expression');
        }

        // Function for safer evaluation:
        const result = Function('"use strict"; return(' + jsExpression + ')')();

        if (!isFinite(result)) {
            throw new Error('Invalid calculation result');
        }

        return result;

    } catch (error) {
        console.error('Calculation error:', error);
        return 'Error';
    }
}

// Function to append to display

function appendToDisplay(value) {
    console.log('Button pressed:', value);
    // If a user just calculated, remove when they calculate again
    let currentValue = display.value;

    if (justCalculated && !isNaN(value)) {
        display.value = value;
        justCalculated = false;
        return;  // End the function
    }

    // If we just calculated and the users presses on operator (add on or subtract)

    if (justCalculated && isOperator(value)) {
        display.value = currentValue + value;
        justCalculated = false;
        return;
    }

    // Handles operators

    if (isOperator(value)) {
        // Don't allow operator as first char (exception for minus)
        if (currentValue === '0' && value !== '-') {
            return; // Do nothing.
        }

        // If the last char is already an operator, replace it.
        
        if (isOperator(getLastChar())) {
            display.value = currentValue.slice(0, -1) + value;
        } else {
            display.value = currentValue + value;
        }

        // Handle, If the current display shows 0 and user enters a number, replace the 0 with the number pressed
    } else if (!isNaN(value)) {
        if (currentValue === '0'){
            display.value = value;
        } else {
            display.value = currentValue + value;
        }
    }

    // ("else if" = Move to the next "if" operation if the first one was false) If the current display shows 0 and the user enters decimal, keep the 0
    else if (value === '.'){
        if (currentValue === '0') {
            display.value = currentValue + value;
        } else {
            // Get the last number in the display after last operator
            let parts = currentValue.split('/[+\-*/]');
            let lastNumber = parts [parts.length - 1];

            // Only add decimal if the number does not already have one.
            if (!lastNumber.includes('.')) {
                display.value = currentValue + value;
            }

        }
    }  else {
        display.value = currentValue + value;
    }
    

    // Reset the justCalculated flag when the user starts typing
    justCalculated = false;

    console.log('Display updated to: ', display.value);

}

function clearDisplay() {
    console.log('Clear button pressed.');

    display.value = '0';
    justCalculated = false;

    display.style.backgroundColor = '#f0f0f0';
    setTimeout(() => {
        display.style.backgroundColor = '';
    }, 150);

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

}

function calculate() {
    let expression = display.value;

    // Don't calc if display is 0 or empty.
    if (expression === '0' || expression === '') {
        return; // Do nothing.
    }

    // Don't calc if expression ends with operator.

    if (isOperator(getLastChar())) {
        return; // Do nothing.
    }

    // Set calculation:

    let result = safeEval(expression);

    if (result === 'Error') {
        display.value = 'Error';
        setTimeout(() => {
            
        }, 2000);
    } else {
        if (Number.isInteger(result)) {
            display.value = result.toString();
        } else {
            display.value = parseFloat(result.toFixed(10)).toString();
        }

        justCalculated = true;
    }

    display.style.backgroundColor = '#e8f5e8';
    setTimeout(() => {
        display.backgroundColor = '';
    }, 300);
    
}

// Capture Key Strokes (Keys pressed by user)

document.addEventListener('keydown', function(event) {
    console.log('Key pressed: ', event.key);

    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '.') {
        appendToDisplay('.');
    } else if (event.key === '+') {
        appendToDisplay('+');
    } else if (event.key === '-') {
        appendToDisplay('-');
    } else if (event.key === '*') {
        appendToDisplay('*');
    } else if (event.key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    }

    else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        deleteLast();
    }
})

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