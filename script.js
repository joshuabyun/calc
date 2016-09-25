var app = angular.module('calcApp', []);
app.controller('calcController',function($log){
    this.calcExpressionDisplay;
    this.inputDisplay;
    this.inputArray = [];//array of objects { value : "", type : "" }
    this.equalSignClicked = false;
    this.ceClicked = false;


    var createObj = function(clickedInput,inputType,self){
        var inputObj = new Object();
        inputObj["value"] = clickedInput;
        inputObj["type"] = inputType;
        self.inputArray.push(inputObj);
    };

    //checks for the input type, calls approperiate functions to keep track of input
    //calls calculate, clear, records num/operator
    this.acceptClickedKey = function(clickedInput,inputType){
        var self = this;
        if(inputType == 'numKey' || inputType == 'specialChar'){
            //call check for calculate condition
            this.checkCalcEligible(clickedInput,inputType);

            if(this.validateInput(clickedInput,inputType)){
                if(inputType == "specialChar" || this.inputArray.length == 0){ //first input item/operator condition
                    createObj(clickedInput,inputType,self);
                    //call update display -for upper and lower display
                }else{
                    var arrayLastPosition = this.inputArray.length -1;
                    if(this.inputArray[arrayLastPosition].type == "numKey"){ //consecutive number input condition
                        this.inputArray[arrayLastPosition].value += clickedInput;
                        //call update display -for lower display only
                    }
                    else{
                        createObj(clickedInput,inputType,self); //alternate input condition
                        //call update display -for upper and lower display
                    }
                }
            }
        }else{
            if(inputType == "equalSign"){ //equal sign condition
                var sum = this.doMath(parseFloat(this.inputArray[0].value),parseFloat(this.inputArray[2].value),this.inputArray[1].value); //would like to use a ref value instead of a hard number
                createObj(sum,"numKey",self);
                this.inputArray.splice(0,this.inputArray.length-1);
                this.equalSignClicked = true;
                //call update display -for upper and lower display - needs to clear upper display
                $log.info("final value : ", sum);
            }else{
                if(clickedInput == "C"){//clear all condition
                    this.inputArray = [];
                    //call update display -for upper and lower display
                }else{ //clear entry condition
                    var lastArrayPos = this.inputArray.length-1;
                    if(this.ceClicked || this.inputArray.length == 0){ //need to deactivate after new input has been inputted
                        $log.warn('invalid');
                        return;
                    }
                    else{
                       
                    }
                }
            }
            //need to take account for clear buttons
        }
        $log.log('updated inputArray',this.inputArray);
    };

    //checks for consecutive operators and multiple decimal points in an input : returns boolean
    this.validateInput = function(clickedInput,inputType){
        //first input condition
        if(this.inputArray.length == 0){
            if(inputType == "specialChar"){
                $log.error('first input cannot be operator');
                return false;
            }else{
                return true;
            }
        }
        else{
            var arrayLastPosition = this.inputArray.length -1;
            if(inputType == "specialChar" && inputType == this.inputArray[arrayLastPosition].type){
                $log.error('cannot accept consecutive operators');
                return false;
            }else{
                if(clickedInput =="." && this.inputArray[arrayLastPosition].value.indexOf(".") != -1){
                    $log.error('cannot multiple decimal points in a number');
                    return false;
                }else{
                    return true;
                }
            }
        }
    };

    //checks whether the expression is ready for calculation
    this.checkCalcEligible = function(clickedInput,inputType){
        var self = this;
        if(inputType == "specialChar"){
            for(var input in this.inputArray){
                 if(this.inputArray[input].type == "specialChar"){
                     var calculatedNum = this.doMath(parseFloat(this.inputArray[0].value),parseFloat(this.inputArray[2].value),this.inputArray[1].value); //would like to use a ref value instead of a hard number
                     //this.inputArray = []; //////////////////////////////////////////////////////clear array and create new obj :doesn't work
                     createObj(calculatedNum,"numKey",self);///////////////////////////////////////
                     this.inputArray.splice(0,3);/////////////////////////////////////////////////create new obj and clear array : works ...why?
                 }
            }
        }
    };




    this.doMath = function(num1, num2, operator){
        $log.log(num1, num2, operator);
        //check for all params. if not available through error
        var answer;
        switch (operator){
            case '+':
                answer = num1 + num2;
                return answer;
                break;
            case '-':
                answer = num1 - num2;
                return answer;
                break;
            case 'X':
                answer = num1 * num2;
                return answer;
                break;
            case '/':
                answer = num1 / num2;
                if(num2 == 0){
                    return "Error";
                }
                return answer;
                break;
        }
    }
});

