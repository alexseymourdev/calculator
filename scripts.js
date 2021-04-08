/*----- Variables -----*/
let number1 = "", number2 = "", operator = "";

/*---- Selecting elements ----*/
var arrNumbers = document.querySelectorAll(".number");
// console.log(arrNumbers);
var arrOperators = document.querySelectorAll(".operator");
// console.log(arrOperators);
var objPreview = document.querySelector(".preview");
// console.log(objPreview);
var objMaths = document.querySelector(".maths");
// console.log(objMaths);
var objClear = document.querySelector(".clear");
// console.log(objClear);


/*----- Event Listeners -----*/
for(counter = 0; counter < arrNumbers.length; counter++){
    // console.log(arrNumbers[counter]);
    objNumber = arrNumbers[counter];
    objNumber.addEventListener("click", preview);
}
for(counter = 0; counter < arrOperators.length; counter++){
    // console.log(arrNumbers[counter]);
    objOperator = arrOperators[counter];
    objOperator.addEventListener("click", preview);
}
objClear.addEventListener("click", clear);

/*----- Functions -----*/
function preview(event){
    // console.log(event.target.innerHTML);
    var currentItem = event.target.innerHTML;
    var dataType;
    var strMessage;
    switch(currentItem){
        case '*':
        case '/':
        case '-':
        case '+':
            dataType = 'operator';
        break;
        default:
            dataType = 'number'
        break;
    }
    // console.log(currentItem);
    console.log(dataType);
    if(dataType == 'operator'){
        if(number1){
            strMessage = number1 + ' ' + currentItem;
        } else {
            console.log('You cannot set an operator without a number being set');
        }
    } else {
        if(number1){
            number1 += currentItem;
        } else {
            number1 = currentItem;
        }
        strMessage = number1;
    }
    objPreview.value = strMessage;
}

function clear(event){
    number1 = "";
    number2 = "";
    operator = "";
    objPreview.value = "";
    objMaths.value = "";
}