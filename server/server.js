const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const equations = []

app.use(express.static('./server/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/equations', (request, response) => {
    console.log('ready for mfn equations');
    console.log('request.route.path is', request.route.path);

    response.send(equations)
});

app.post('/equations', (request, response) => {
    console.log('here are those numbers');
    console.log('request.body', request.body);
    let newEquation = request.body
    if (!newEquation.firstNumber || !newEquation.secondNumber) {
        response.status(400).send({
            message: 'Must input two numbers!'
        });
        return
    }
    equations.push(request.body);
    response.sendStatus(200);
    calculateEquation();

})

let additionResult = 0;
let subtractionResult = 0;
let multiplicationResult = 0;
let divisionResult = 0;

function calculateResult() {
    for (let equation of equations) {
        if (equation.operator === '+') {
            additionResult = Number(equation.firstNumber) + Number(equation.secondNumber)
            equation.result = additionResult;
            console.log(additionResult); //checks that result is right
            additionResult = 0
            console.log(additionResult);
        } //end addition if statement
        else if (equation.operator === '-') {
            subtractionResult = Number(equation.firstNumber) - Number(equation.secondNumber)
            equation.result = subtractionResult;
            console.log(subtractionResult); //checks that result is right
            subtractionResult = 0
            console.log(subtractionResult);
        } //end subtraction if statement
        else if (equation.operator === '*') {
            multiplicationResult = Number(equation.firstNumber) * Number(equation.secondNumber)
            equation.result = multiplicationResult;
            console.log(multiplicationResult); //checks that result is right
            multiplicationResult = 0
            console.log(multiplicationResult);
        } //end multiplication if statement
        else if (equation.operator === '/') {
            divisionResult = Number(equation.firstNumber) / Number(equation.secondNumber)
            equation.result = divisionResult;
            console.log(divisionResult); //checks that result is right
            divisionResult = 0
            console.log(divisionResult);
        } //end division if statement
     }
}