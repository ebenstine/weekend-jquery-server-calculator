const express = require('express');
let bodyParser = require('body-parser');
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('server/public'));

app.listen(port, () => {
    console.log('listening on port', port);
});
let input = [];
let results = [];
let ledger = [];

app.get('/calc', (req, res) => {
    console.log('in /calc GET');
    res.send({
        results,
        ledger
    });
})

app.post('/calc', (req, res) => {
    console.log('in /calc POST', req.body);
    let newEquation = req.body;

    input.push(newEquation);
    calculateEquation();
    updateLedger();
    res.sendStatus(200);
})

function calculateEquation() {
    let number = 0;

    if (input[input.length - 1].operator === '+') {
        number = Number(input[input.length - 1].firstNumber) + Number(input[input.length - 1].secondNumber);
    } else if (input[input.length - 1].operator === '-') {
        number = input[input.length - 1].firstNumber - input[input.length - 1].secondNumber;
    } else if (input[input.length - 1].operator === '*') {
        number = input[input.length - 1].firstNumber * input[input.length - 1].secondNumber;
    } else if (input[input.length - 1].operator === '/') {
        number = input[input.length - 1].firstNumber / input[input.length - 1].secondNumber;
    }
    results.push(number);

}

function updateLedger() {
    let equation = input[input.length - 1].firstNumber + ' ' + input[input.length - 1].operator + ' ' + input[input.length - 1].secondNumber + ' ' + '=' + ' ' + results[results.length - 1];
    ledger.push(equation);
}