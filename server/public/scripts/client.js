$(document).ready(onReady);

function onReady() {
    console.log('we out here ready');
    //Don't think these will actually be needed
    //$('#addButton').on('click', add);
    //$('#subtractButton').on('click', subtract);
    //$('#multiplyButton').on('click', multiply);
    //$('#divideButton').on('click', divide);
    $('#clearButton').on('click', clearValues);
    $('#solveButton').on('click', function (event) {
        event.preventDefault();
        documentEquation();
    })
}

function documentEquation() {
    let newEquation = {
        firstNumber: $('#firstNumberInput').val(),
        operator: $('#operatorInput'),
        secondNumber: $('#secondNumberInput').val(),
        inquisitor: "=",
        result: ""
    }
    console.log('documenting equation', newEquation);


    $.ajax({
        method: 'POST',
        url: '/equations',
        data: newEquation
    }).then((response) => {
        console.log('POST /equations', response);
        getEquations();
    }).catch((error) => {
        console.log('POST /equations failed!', error);

        //render the error message to the DOM
        $('body').append(`
        <h2>
        failed to save equation! 
        </h2>
        `);
    });
}

let getEquations = () => {
    $.ajax({
        method: 'GET',
        url: '/equations'

    }).then((response) => {
        console.log('GET /equations response', response);
        let equationList = $('#equations');
        console.log('equations list element', equation);
        equationList.empty();
        for (let equation of response) {
            equationList.append(`
        <li>
        ${equation.firstNumber}
        ${equation.operator}
        ${equation.secondNumber}
        ${equation.inquisitor}
        ${equation.result}
        </li>
        `);
        }
    });

}
function clearValues(){
    console.log('in clearValues');
    $('#firstNumberInput').val('');
    $('#secondNumberInput').val('');
}//end clearValues
