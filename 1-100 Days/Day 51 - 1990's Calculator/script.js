function insert(value) {
    document.cal.xxx.value += value;
}

function clearEntry() {
    document.cal.xxx.value = '';
}

function clearAll() {
    document.cal.xxx.value = '';
}

function powerOff() {
    document.cal.xxx.value = 'OFF';
    setTimeout(() => {
        document.cal.xxx.value = '';
    }, 1000);
}

function backspace() {
    document.cal.xxx.value = document.cal.xxx.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = document.cal.xxx.value.replace(/÷/g, '/').replace(/×/g, '*');
        if (expression.includes('^')) {
            expression = expression.replace(/\^/g, '**');
        }
        document.cal.xxx.value = eval(expression);
    } catch (error) {
        document.cal.xxx.value = 'Error';
        setTimeout(() => {
            document.cal.xxx.value = ''; // setTimeout clears the 'Error' message after 2 seconds which is 2000 miliseconds
        }, 2000);
    }
}


function squareRoot() {
    try {
        document.cal.xxx.value = Math.sqrt(eval(document.cal.xxx.value));
    } catch (error) {
        document.cal.xxx.value = 'Error';
        setTimeout(() => {
            document.cal.xxx.value = '';
        }, 2000);
    }
}