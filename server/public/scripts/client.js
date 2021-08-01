console.log('In JS');
let operator = 0;
$(document).ready(onReady);

function onReady() {
    console.log('In JQ');
    $('#add').on('click', add);
    $('#subtract').on('click', subtract);
    $('#multiply').on('click', multiply);
    $('#divide').on('click', divide);
    $('#clear').on('click', clear);
    $('#equal').on('click', function(event) {
        event.preventDefault();
        addEquation();
    })
    
}
function addEquation() {
    let newEquation = {
        firstNumber: $('#numberOne').val(),
        secondNumber: $('#numberTwo').val(),
        operator: operator,
    }
    console.log('Adding equation', newEquation);
    $.ajax({
        method: 'POST',
        url: '/calc',
        data: newEquation
    })
        .then(function(response) {
            getHistory();
        })
        .catch(function(error) {
            console.log('Error from server', error);
            alert('Equation NO GO');
        })
    clear();
}

function getHistory() {
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
    $('#history').empty();

    $('#output').append(`
        <div>${object.result[object.result.length -1]}</div>
        `)

    for (let i = 0; i < object.history.length; i++) {
        $('#history').append(`
        <ul>${object.history[i]}</ul>
        `) 
    }
}
function add() {
    operator = '+';
    console.log('clicked', operator);
}
function subtract(){
    operator = '-';
    console.log('clicked', operator);
}
function multiply(){
    operator = '*';
    console.log('clicked', operator);
}
function divide(){
    operator = '/';
    console.log('clicked', operator);
}
function clear(){
    $('#numberOne').val('');
    $('#numberTwo').val('');
    operator = 0;
}
