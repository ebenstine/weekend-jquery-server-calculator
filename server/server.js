console.log('express yourself');

//load up express library
const express = require('express');
//load up the body parser module
const bodyParser = require('body-parser');
//this creates the "app" or server
const app = express();

//tells the server how to read data from the client
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('server/public'));

//setting up arrays
let input = [];
let results = [];
let ledger = [];
//
app.get('/calculation', (req, res) => {
    console.log('in /calc GET');
    res.send({
        results,
        ledger
    });
})
//post calculations
app.post('/calculation', (req, res) => {
    console.log('in /calc POST', req.body);
    //gives body parser the info from client 
    let newEquation = req.body;
    //push and run call functions to update, send status
    input.push(newEquation);
    calculateEquation();
    updateLedger();
    res.sendStatus(200);
})

//function to outline the different forms of math according to the operator functions in client
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
//update the ledger with the complete documentation of the equation
function updateLedger() {
    let equation = `${input[input.length -1].firstNumber}${' '}${input[input.length -1].operator}${' '}${input[input.length -1].secondNumber}${' '}${'='}${' '}${results[results.length - 1]}`;
    ledger.push(equation);
}

//do not open in browser
//listen for requests
const port = 5000;
app.listen(port, function(){
    console.log('check the app on localhost');
});