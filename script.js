var app = angular.module('calcApp', []);
app.controller('calcController',function($log){
    this.upperDisplay = "";
    this.lowerDisplay;
    this.inputArray = [];
    this.equalSignClicked = false;
    this.ceClicked = false;

    this.acceptKeyPressed = function(pressedKey){
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
                this.acceptClickedBtn(acceptableKey[input].input,acceptableKey[input].inputType);
            }
        }
    };

    //checks for the input type, calls approperiate functions according to the input
    this.acceptClickedBtn = function(clickedInput,inputType){
        var self = this;
        if(!this.validateInput(clickedInput,inputType)){
            return
        }
        //validates input - returns False on multiple decimals in one number, consecutive operators, operator as a first input
        switch(inputType){
            case 'numKey' :
                if(this.inputArray.length == 0){                                        //first number input condition
                    createObj(clickedInput,inputType,self);
                }else{
                    var arrayLastPosition = this.inputArray.length -1;
                    if(this.inputArray[arrayLastPosition].type == "numKey"){            //consecutive number input condition
                        if(this.equalSignClicked){
                            this.inputArray = [];
                            createObj(clickedInput,inputType,self);
                            this.equalSignClicked = false;
                        }else{
                            this.inputArray[arrayLastPosition].value += clickedInput;
                        }
                    }
                    else{
                        if(this.ceClicked){
                            this.ceClicked = false;
                        }
                        createObj(clickedInput,inputType,self);                          //alternate input condition
                    }
                }
                this.updateLowerDisplay();
                break;
            case 'specialChar' :
                this.equalSignClicked = false;
                if(this.checkCalcEligible()){                                           //ready to calculate : (num operator num)
                    if(this.ceClicked){
                        createObj(0,"numKey",self);
                        this.ceClicked = false;
                    }
                    this.updateUpperDisplay(clickedInput);
                    var calculatedNum = this.doMath(parseFloat(this.inputArray[0].value),parseFloat(this.inputArray[2].value),this.inputArray[1].value); 
                    this.inputArray = [];
                    createObj(calculatedNum,"numKey",self);
                    this.updateLowerDisplay();
                    createObj(clickedInput,inputType,self);
                }else{                                                                  //not yet ready to calculate
                    if(this.ceClicked){
                        createObj(0,"numKey",self);
                        this.updateUpperDisplay(clickedInput);
                        var sum = this.doMath(parseFloat(this.inputArray[0].value),parseFloat(this.inputArray[2].value),this.inputArray[1].value); 
                        this.inputArray = [];
                        createObj(sum,"numKey",self);
                        this.ceClicked = false;
                        this.updateLowerDisplay();
                        createObj(clickedInput,inputType,self);
                    }else{
                        this.updateUpperDisplay(clickedInput);
                        this.updateLowerDisplay();
                        createObj(clickedInput,inputType,self);
                    }
                }
                break;
            case 'equalSign' :
                if(this.checkCalcEligible()){
                    var output = this.doMath(parseFloat(this.inputArray[0].value),parseFloat(this.inputArray[2].value),this.inputArray[1].value);
                    createObj(output,"numKey",self);
                    this.inputArray.splice(0,this.inputArray.length-1);
                    this.equalSignClicked = true;
                    $log.info("final value : ", output);
                    this.clearUpperDisplay();
                    this.updateLowerDisplay();
                }
                break;
            case 'clear' :
                if(clickedInput == "C"){                                                    //clear all condition
                    this.inputArray = [];
                    this.clearUpperDisplay();
                    this.clearLowerDisplay();
                }else{                                                                      //clear entry condition
                    var lastInputArrPos = this.inputArray.length -1;
                    if(this.inputArray[lastInputArrPos].type == "numKey"){                              //CE clicked on a number
                        this.clearEntry();
                        this.changeLowerDisplayToZero();
                        this.ceClicked = true;
                    }else{                                                                              //CE clicked on an operator
                        this.changeLowerDisplayToZero();
                        this.ceClicked = true;
                    }
                }
                break;
        }
        $log.log(this.inputArray);
    };
    this.updateLowerDisplay = function(){
        var lastNumPos = this.inputArray.length-1;
        this.lowerDisplay = this.inputArray[lastNumPos].value;
    };
    this.updateUpperDisplay = function(currentOperator){
        var lastInputArrayPos = this.inputArray.length-1;
        this.upperDisplay += this.inputArray[lastInputArrayPos].value + currentOperator;
    };
    this.clearUpperDisplay = function(){
        this.upperDisplay = "";
    };
    this.clearLowerDisplay = function(){
        this.lowerDisplay = "";
    };
    this.clearEntry = function(){
        var lastNumPos = this.inputArray.length-1;
        this.inputArray.splice(lastNumPos,1);
    };
    this.changeLowerDisplayToZero = function(){
        this.lowerDisplay = 0;
    };
    //checks for consecutive operators and multiple decimal points in an input : returns boolean
    this.validateInput = function(clickedInput,inputType){
        //first input condition - only looks for the number
        if(this.inputArray.length == 0){
            if(inputType == "specialChar"){
                $log.error('first input cannot be operator');
                return false;
            }else{
                return true;
            }
        }
        else{
            if(this.ceClicked && inputType == "specialChar"){                                               //exception for consecutive operators : CE clicked
                return true
            }
            var arrayLastPosition = this.inputArray.length -1;
            if(inputType == "specialChar" && inputType == this.inputArray[arrayLastPosition].type){         //error handler : consecutive operators
                $log.error('cannot accept consecutive operators');
                return false;
            }else{
                if(clickedInput =="." && this.inputArray[arrayLastPosition].value.indexOf(".") != -1){      //error handler : multiple decimals in a number
                    $log.error('cannot use multiple decimals in a number');
                    return false;
                }else{
                    return true;
                }
            }
        }
    };
    //creates an object to insert into inputArray
    var createObj = function(clickedInput,inputType,self){
        var inputObj = new Object();
        inputObj["value"] = clickedInput;
        inputObj["type"] = inputType;
        self.inputArray.push(inputObj);
    };
    //checks whether the expression is ready to calculate
    this.checkCalcEligible = function(){
        if(this.inputArray.length == 3){
            if(this.inputArray[0].type == "numKey" && this.inputArray[2].type == "numKey" && this.inputArray[1].type == "specialChar"){
                return true;
            }else{
                $log.error('incomplete expression');
            }
        }
    };
    //actual calculation
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

