var app = angular.module('calcApp', []);
app.controller('calcController',function($log){
    this.upperDisplay = "";
    this.lowerDisplay;
    this.inputArray = [];
    this.equalSignClicked = false;
    this.ceClicked = false;

    // this.console = function(input){
    //   console.log(input);  
    // };
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
    //checks for the input type, calls approperiate functions according to the input
    this.acceptClickedKey = function(clickedInput,inputType){
        var self = this;
        if(!this.validateInput(clickedInput,inputType)){
            return
        } //validates input - returns False on multiple decimals in one number, consecutive operators, operator as a first input
        switch(inputType){
            case 'numKey' :
                if(this.inputArray.length == 0){                             //first number input condition
                    createObj(clickedInput,inputType,self);
                }else{
                    var arrayLastPosition = this.inputArray.length -1;
                    if(this.inputArray[arrayLastPosition].type == "numKey"){ //consecutive number input condition
                        if(this.equalSignClicked){
                            this.inputArray = [];
                            createObj(clickedInput,inputType,self);
                            this.equalSignClicked = false;
                        }else{
                            this.inputArray[arrayLastPosition].value += clickedInput;
                        }
                    }
                    else{
                        createObj(clickedInput,inputType,self);                //alternate input condition
                    }
                }
                this.updateLowerDisplay();
                break;
            case 'specialChar' :
                this.equalSignClicked = false;
                if(this.checkCalcEligible()){
                    $log.log("special char, ready to calculate",this.inputArray);
                    if(this.ceClicked){
                        createObj(0,"numKey",self);
                        this.ceClicked = false;
                    }
                    this.updateUpperDisplay(clickedInput);
                    var calculatedNum = this.doMath(parseFloat(this.inputArray[0].value),parseFloat(this.inputArray[2].value),this.inputArray[1].value); //would like to use a ref value instead of a hard number
                    this.inputArray = [];
                    createObj(calculatedNum,"numKey",self);
                    this.updateLowerDisplay();
                    createObj(clickedInput,inputType,self);
                }else{
                    $log.log("special char, not ready to calculate",this.inputArray);
                    if(this.ceClicked){
                        createObj(0,"numKey",self);
                        this.ceClicked = false;
                    }
                    this.updateUpperDisplay(clickedInput);
                    createObj(clickedInput,inputType,self);
                }
                break;
            case 'equalSign' :
                if(this.checkCalcEligible()){
                    var output = this.doMath(parseFloat(this.inputArray[0].value),parseFloat(this.inputArray[2].value),this.inputArray[1].value); //would like to use a ref value instead of a hard number
                    createObj(output,"numKey",self);
                    this.inputArray.splice(0,this.inputArray.length-1);
                    this.equalSignClicked = true;
                    $log.info("final value : ", output);
                    this.clearUpperDisplay();
                    this.updateLowerDisplay();
                }
                break;
            case 'clear' :
                if(clickedInput == "C"){            //clear all condition
                    this.inputArray = [];
                    this.clearUpperDisplay();
                    this.clearLowerDisplay();
                }else{                              //clear entry condition
                    var lastInputArrPos = this.inputArray.length -1;
                    if(this.inputArray[lastInputArrPos].type == "numKey"){       //CE clicked on a number
                        this.clearEntry();
                        this.changeLowerDisplayToZero();
                        this.ceClicked = true;
                        //if an operator is clicked, set the number before the operator as 0. if a number is clicked proceed as usual
                    }else{                                                  //CE clicked on an operator
                        this.changeLowerDisplayToZero();
                        this.ceClicked = true;
                        //if an operator is clicked, set the number before the operator as 0. if a number is clicked proceed as usual
                    }
                }
                break;
        }
        $log.log(this.inputArray);
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
            var arrayLastPosition = this.inputArray.length -1;
            if(inputType == "specialChar" && inputType == this.inputArray[arrayLastPosition].type){
                $log.error('cannot accept consecutive operators');
                return false;
            }else{
                if(clickedInput =="." && this.inputArray[arrayLastPosition].value.indexOf(".") != -1){
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

