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
    //posting equation info to /calc
    //sending equation data to the server
    $.ajax({
        method: 'POST',
        url: '/calculation',
        data: newEquation
    })
    //refresh data from the server only after the request is completed
        .then(function(response) {
            retrieveLedger();
        })
        .catch(function(error) {
            console.log('Error from server', error);
            alert('Equation NO GO');
        })
    //clear fields
    clearInputs();
}

function retrieveLedger() {
    console.log('about to hit up AJAX');
    //tell AJAX where to go
    $.ajax({
        method: 'GET',
        url: '/calculation'
    })
    //ony after the request is completed, 
        .then(function(response){
            console.log('Response from server', response);
            render(response);
        })
        .catch( function( error ){
            console.log('Error from server', error);
            alert('Sorry, could not get response. Try again later.');
        })
}
//render equation results with JQuery
function render(object) {
    $('#output').empty();
    $('#ledger').empty();

    $('#output').append(`
        <div>${object.results[object.results.length -1]}</div>
        `)
//loop through the ledger and append
    for (let i = 0; i < object.ledger.length; i++) {
        $('#ledger').append(`
        <ul>${object.ledger[i]}</ul>
        `) 
    }
}
//functions to define operator abilities
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
//non-functional.
function clearLedger(){
    $.ajax({
        method: 'DELETE',
        url: '/calculation',
        data: {
            "ledger":ledger
        }
    })
}
