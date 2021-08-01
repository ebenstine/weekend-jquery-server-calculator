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



