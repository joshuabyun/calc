var app = angular.module('calcApp', []);
app.factory('calculate',function($log){
    var calculatorFunc = {};

    calculatorFunc.inputArray = [];
    calculatorFunc.ceClicked = false;
    calculatorFunc.equalSignClicked = false;

    calculatorFunc.checkKeyPressed = function(pressedKey){
        var acceptableKey =
        {
            '0' : {input : '0', inputType : "numKey"},
            '1' : {input : '1', inputType : "numKey"},
            '2' : {input : '2', inputType : "numKey"},
            '3' : {input : '3', inputType : "numKey"},
            '4' : {input : '4', inputType : "numKey"},
            '5' : {input : '5', inputType : "numKey"},
            '6' : {input : '6', inputType : "numKey"},
            '7' : {input : '7', inputType : "numKey"},
            '8' : {input : '8', inputType : "numKey"},
            '9' : {input : '9', inputType : "numKey"},
            '.' : {input : '.', inputType : "numKey"},
            'Enter' : {input : '=', inputType : "equalSign"},
            '/' : {input : '/', inputType : "specialChar"},
            '*' : {input : 'X', inputType : "specialChar"},
            '-' : {input : '-', inputType : "specialChar"},
            '+' : {input : '+', inputType : "specialChar"}
        };
        for(var input in acceptableKey){
            if(pressedKey == input){
                return acceptableKey[input];
            }
        }
    };

    calculatorFunc.validateAllInput = function(clickedInput,inputType){
        if(calculatorFunc.inputArray.length == 0){                                                                    //first input condition - only looks for the number
            if(inputType == "specialChar"){
                $log.error('first input cannot be operator');
                return false;
            }else{
                return true;
            }
        }
        else{
            if(calculatorFunc.ceClicked && inputType == "specialChar"){                                               //exception for consecutive operators : CE clicked
                return true
            }
            var arrayLastPosition = calculatorFunc.inputArray.length -1;
            if(inputType == "specialChar" && inputType == calculatorFunc.inputArray[arrayLastPosition].type){         //error handler : consecutive operators
                $log.error('cannot accept consecutive operators');
                return false;
            }else{
                if(clickedInput =="." && calculatorFunc.inputArray[arrayLastPosition].value.indexOf(".") != -1){      //error handler : multiple decimals in a number
                    $log.error('cannot use multiple decimals in a number');
                    return false;
                }else{
                    return true;
                }
            }
        }
    };
    calculatorFunc.handleInput = function(clickedInput,inputType){
        var self = this;
        switch(inputType){
            case 'numKey' :
                if(calculatorFunc.inputArray.length == 0){                                        //first number input condition
                    createObj(clickedInput,inputType,self);
                    if(calculatorFunc.ceClicked){
                        calculatorFunc.ceClicked = false;
                    }
                }else{
                    var arrayLastPosition = calculatorFunc.inputArray.length -1;
                    if(calculatorFunc.inputArray[arrayLastPosition].type == "numKey"){            //consecutive number input condition
                        if(calculatorFunc.ceClicked){
                            calculatorFunc.inputArray[arrayLastPosition].value += clickedInput;
                            calculatorFunc.ceClicked = false;
                        }else if(calculatorFunc.equalSignClicked){
                            calculatorFunc.inputArray = [];
                            createObj(clickedInput,inputType,self);
                            calculatorFunc.equalSignClicked = false;
                        }else{
                            calculatorFunc.inputArray[arrayLastPosition].value += clickedInput;
                        }
                    }
                    else{
                        createObj(clickedInput,inputType,self);                                     //alternate input condition
                    }
                }
                return calculatorFunc.inputArray;
                break;
            case 'specialChar' :
                calculatorFunc.equalSignClicked = false;
                if(checkCalcEligible()){                                                            //ready to calculate : (num operator num)
                    var calculatedNum = doMath(parseFloat(calculatorFunc.inputArray[0].value),parseFloat(calculatorFunc.inputArray[2].value),calculatorFunc.inputArray[1].value);
                    calculatorFunc.inputArray = [];
                    createObj(calculatedNum,"numKey",self);
                    createObj(clickedInput,inputType,self);
                }else{                                                                              //not yet ready to calculate
                    if(calculatorFunc.ceClicked){
                        createObj(0,"numKey",self);
                        var sum = doMath(parseFloat(calculatorFunc.inputArray[0].value),parseFloat(calculatorFunc.inputArray[2].value),calculatorFunc.inputArray[1].value);
                        calculatorFunc.inputArray = [];
                        createObj(sum,"numKey",self);
                        calculatorFunc.ceClicked = false;
                        createObj(clickedInput,inputType,self);
                    }else{
                        createObj(clickedInput,inputType,self);
                    }
                }
                return calculatorFunc.inputArray;
                break;
            case 'equalSign' :
                if(checkCalcEligible()){
                    var output = doMath(parseFloat(calculatorFunc.inputArray[0].value),parseFloat(calculatorFunc.inputArray[2].value),calculatorFunc.inputArray[1].value);
                    createObj(output,"numKey",self);
                    calculatorFunc.inputArray.splice(0,calculatorFunc.inputArray.length-1);
                    calculatorFunc.equalSignClicked = true;
                    $log.info("final value : ", output);
                    return calculatorFunc.inputArray;
                }
                break;
            case 'clear' :
                if(clickedInput == "C"){                                                    //clear all condition
                    calculatorFunc.inputArray = [];
                }else{                                                                      //clear entry condition
                    var lastInputArrPos = calculatorFunc.inputArray.length -1;
                    if(calculatorFunc.inputArray[lastInputArrPos].type == "numKey"){                                //CE clicked on a number
                        removeLastEntry();
                        calculatorFunc.ceClicked = true;
                    }else{                                                                                          //CE clicked on an operator
                        calculatorFunc.ceClicked = true;
                    }
                }
                return calculatorFunc.inputArray;
                break;
        }
    };
    var checkCalcEligible = function(){                                     //checks whether the expression is ready to calculate
        if(calculatorFunc.inputArray.length == 3){
            if(calculatorFunc.inputArray[0].type == "numKey" && calculatorFunc.inputArray[2].type == "numKey" && calculatorFunc.inputArray[1].type == "specialChar"){
                return true;
            }else{
                $log.error('incomplete expression');
            }
        }
    };
    var removeLastEntry = function(){                                       //removes the last entry from the array
        var lastNumPos = calculatorFunc.inputArray.length-1;
        calculatorFunc.inputArray.splice(lastNumPos,1);
    };
    var createObj = function(clickedInput,inputType,self){                  //creates an object to insert into inputArray
        var inputObj = {};
        inputObj["value"] = clickedInput;
        inputObj["type"] = inputType;
        self.inputArray.push(inputObj);
    };
    var doMath = function(num1, num2, operator){                            //actual calculation
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
    };
    return calculatorFunc;
});

app.controller('calcController',function($log, calculate){
    this.upperDisplay = "";
    this.lowerDisplay;
    this.lastClickedNum;
    this.acceptKeyPressed = function(pressedKey){
        var inputObj = calculate.checkKeyPressed(pressedKey);
        this.acceptClickedBtn(inputObj.input,inputObj.inputType);
    };
    this.acceptClickedBtn = function(clickedInput,inputType){
        if(!calculate.validateAllInput(clickedInput,inputType)){
            return
        }
        //recieves an inputs from the calculator button, and returns an array of clicked inputs(in object).
        // Upon the click of 2nd operator, if the returning array consists of 2# and 1op, it calculates, clears the array and insert the calculation into the array
        var inputArray = calculate.handleInput(clickedInput,inputType);
        $log.log("inputArray : ",inputArray);
        this.updateDisplay(inputArray,inputType,clickedInput);
    };
    this.updateDisplay = function(inputArray,inputType,clickedInput){
        switch(inputType){
            case "numKey" :
                this.lastClickedNum = inputArray[inputArray.length-1].value;    //actual input from the calculator
                this.updateLowerDisplay(this.lastClickedNum);
                break;
            case "equalSign":
                this.lastClickedNum = inputArray[inputArray.length-1].value;        //the object generated through calculation. this has different meaning from this.lastClickedNum, which is an actual input from the calculator
                this.clearUpperDisplay();
                this.updateLowerDisplay(this.lastClickedNum);
                break;
            case "clear":
                switch(clickedInput){
                    case "C":
                        this.clearUpperDisplay();
                        this.clearLowerDisplay();
                        // this.lastClickedNum = '';
                        break;
                    case "CE":
                        this.changeLowerDisplayToZero();
                        break;
                }
                break;
            case "specialChar":
                var outputValue = inputArray[inputArray.length-2].value;
                this.updateUpperDisplay(inputArray);
                this.updateLowerDisplay(outputValue);
                //
                break;
        }
    };
    this.updateLowerDisplay = function(inputArrayNumObj){
        //var lastNumPos = inputArray.length-1;
        //this.lowerDisplay = inputArray[lastNumPos].value;
        this.lowerDisplay = inputArrayNumObj;
    };
    this.updateUpperDisplay = function(inputArray){
        var lastArrayPos = inputArray.length-1;
        this.upperDisplay += this.lastClickedNum+inputArray[lastArrayPos].value;
    };
    this.clearUpperDisplay = function(){
        this.upperDisplay = "";
    };
    this.clearLowerDisplay = function(){
        this.lowerDisplay = "";
    };
    this.changeLowerDisplayToZero = function(){
        this.lowerDisplay = 0;
    };





});

