var objCalculator = {
    _self:this,
    number1:"",
    number2:"",
    operator:"",
    blnEquals:false,
    init: function(){
        this.selectElements();
        this.addEventListeners();
        console.log(this);
    },
    selectElements:function(){
        this.arrNumbers = document.querySelectorAll(".number");
        this.arrOperators = document.querySelectorAll(".operator");
        this.objPreview = document.querySelector(".preview");
        this.objPrevious = document.querySelector(".previous");
        this.objMaths = document.querySelector(".maths");
        this.objClear = document.querySelector(".clear");
        this.objEquals = document.querySelector(".equals");
        this.objError = document.querySelector(".error");
        this.objDecimal = document.querySelector(".decimal");
    },
    addEventListeners:function(){
        /*----- Event Listeners -----*/
        _self = this;
        for(counter = 0; counter < this.arrNumbers.length; counter++){
            // console.log(arrNumbers[counter]);
            objNumber = this.arrNumbers[counter];
            objNumber.addEventListener("click", function(event){
                currentItem = event.target.innerHTML;
                _self.preview(currentItem);
            });
        }
        for(counter = 0; counter < this.arrOperators.length; counter++){
            // console.log(arrNumbers[counter]);
            objOperator = this.arrOperators[counter];
            objOperator.addEventListener("click", function(event){
                currentItem = event.target.innerHTML;
                _self.preview(currentItem);
            });
        }
        this.objClear.addEventListener("click", this.clear);
        this.objEquals.addEventListener("click", function(event){
            _self.equals();
        });
        this.objDecimal.addEventListener("click", function(event){
            currentItem = event.target.innerHTML;
            _self.preview(currentItem);
        });
    },
    preview:function(currentItem){
        // console.log(blnEquals);
        // console.log(event.target.innerHTML);
        // var currentItem = event.target.innerHTML;
        var dataType;
        var strMessage;
        // console.log(this);
        this.errorMessage("");
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
        // console.log(dataType);
        if(dataType == 'operator'){
            this.blnEquals = false;
            if(this.number2){
                this.number1 = this.calculator(this.number1,this.number2,this.operator);
                this.number2 = "";
                this.objPrevious.value = this.objPreview.value;
                this.objMaths.value = "";
            }
            if(this.number1){
                this.operator = currentItem;
                strMessage = this.number1 + ' ' + this.operator;
            } else {
                this.errorMessage('You cannot set an operator without a number being set');
                return;
            }
        } else {
            if(this.blnEquals){
                this.number1 = "";
                this.objPrevious.value = "";
                this.blnEquals = false;
            }
            if(this.operator){
                this.number2 = this.processNumber(this.number2,currentItem);
                strMessage = this.number1 + ' ' + this.operator + ' ' + this.number2;
                var sum = this.calculator(this.number1,this.number2,this.operator);
                this.objMaths.value = sum;
            } else {
                this.number1 = this.processNumber(this.number1,currentItem);
                strMessage = this.number1;
            }
        }
        this.objPreview.value = strMessage;
    },
    hasDecimal:function(number){
        if(number.indexOf('.') !== -1){
            this.errorMessage('You can only have one decimal place per number');
            return true;
        }
        return false;
    },
    clear:function(event){
        this.number1 = "";
        this.number2 = "";
        this.operator = "";
        this.objPrevious.value = "";
        this.objPreview.value = "";
        this.objMaths.value = "";
        this.errorMessage("");
    },
    equals:function(){
        var sum = this.calculator(this.number1,this.number2,this.operator);
        if(sum){
            this.objMaths.value = "";
            this.objPrevious.value = this.objPreview.value;
            this.objPreview.value = sum;
            this.blnEquals = true;
            this.number1 = sum;
            this.number2 = "";
            this.operator = "";
        }
    },
    processNumber:function(number,character){
        if(number){
            if(character == '.'){
                if(!this.hasDecimal(number)){
                    number += character;
                }
            } else {
                number += character;
            }
        } else {
            if(character == '.'){
                number = '0.';
            } else {
                number = character;
            }
        }
        return number;
    },
    isValidNumber:function(number){
        //We are using a double negative as inNaN returns false on valid numbers
        return !isNaN(number);
    },
    calculator:function(number1,number2,operator){
        if(!this.isValidNumber(number1) || !number1){
            //end the function here and pass the message below.
            this.errorMessage('Number 1 must be set');
            return;
        }
        // if the operator does not equal + - * / %
        if(operator != '+' && operator != '-' && operator != '*' && operator != '/' && operator != '%'){
            //end the function here and pass the message below.
            this.errorMessage('You need to set an operator');
            return;
        }
        //if number 2 is not a number
        if(!this.isValidNumber(number2) || !number2){
            //end the function here and pass the message below.
            this.errorMessage('Number 2 must be set');
            return;
        }
        //all fo the validation has passed so we need to do maths
        var sum;
        //based on the operator passed in argument 3 we will do a different sum
        switch(operator){
            case '+':
                sum = parseFloat(number1) + parseFloat(number2);
            break;
            case '-':
                sum = number1 - number2;
            break;
            case '*':
                sum = number1 * number2;
            break;
            case '/':
                sum = number1 / number2;
            break;
            case '%':
                sum = number1 % number2;
            break;
        }
        //return the value of the sum
        return sum;
    },
    errorMessage(message){
        this.objError.innerHTML = message;
    }
};
objCalculator.init();