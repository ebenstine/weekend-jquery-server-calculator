console.log('In JS');
let operator = 0;
$(document).ready(onReady);
//load up buttons so that they'll function on page load

function onReady() {
    console.log('In JQ');
    $('#add').on('click', add);
    $('#subtract').on('click', subtract);
    $('#multiply').on('click', multiply);
    $('#divide').on('click', divide);
    $('#clear').on('click', clearLedger);
    $('#equal').on('click', function(event) {
        event.preventDefault();
        addEquation();
    })
    
}


//grab data from the DOM inputs
function addEquation() {
    let newEquation = {
        firstNumber: $('#numberOne').val(),
        secondNumber: $('#numberTwo').val(),
        operator: operator,
    }
    console.log('Adding equation', newEquation);
    //posting equation info /calc
    //sending equation data to the server
    $.ajax({
        method: 'POST',
        url: '/calc',
        data: newEquation
    })
        .then(function(response) {
            retrieveLedger();
        })
        .catch(function(error) {
            console.log('Error from server', error);
            alert('Equation NO GO');
        })
    clearInputs();
}

function retrieveLedger() {
    $.ajax({
        method: 'GET',
        url: '/calc'
    })
        .then(function(response){
            console.log('Response from server', response);
            render(response);
        })
        .catch( function( error ){
            console.log('Error from server', error);
            alert('Sorry, could not get response. Try again later.');
        })
}

function render(object) {
    $('#output').empty();
    $('#ledger').empty();

    $('#output').append(`
        <div>${object.results[object.results.length -1]}</div>
        `)

    for (let i = 0; i < object.ledger.length; i++) {
        $('#ledger').append(`
        <ul>${object.ledger[i]}</ul>
        `) 
    }
}
function add() {
    operator = '+';
    console.log('operating with', operator);
}
function subtract(){
    operator = '-';
    console.log('operating with', operator);
}
function multiply(){
    operator = '*';
    console.log('operating with', operator);
}
function divide(){
    operator = '/';
    console.log('operating with', operator);
}
function clearInputs(){
    $('#numberOne').val('');
    $('#numberTwo').val('');
    operator = 0;
}

function clearLedger(){
    $.ajax({
        method: 'DELETE',
        url: '/calc',
        data: {
            "ledger":ledger
        }
    })
}
