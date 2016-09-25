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
    this.updateUpperDisplay = function(){
      for(var obj in this.inputArray){
          this.upperDisplay += this.inputArray[obj].value;
      }
    };
    this.clearUpperDisplay = function(){
      this.upperDisplay = "";
    };
    //checks for the input type, calls approperiate functions according to the input
    this.acceptClickedKey = function(clickedInput,inputType){
        var self = this;
        this.validateInput(clickedInput,inputType); //validates input - returns False on multiple decimals in one number, consecutive operators, operator as a first input
        switch(inputType){
            case 'numKey' :
                if(this.inputArray.length == 0){
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
                        //call update display -for lower display only
                    }
                    else{
                        createObj(clickedInput,inputType,self); //alternate input condition
                        //call update display -for upper and lower display
                    }
                }
                this.updateLowerDisplay();
                break;
            case 'specialChar' :
                this.equalSignClicked = false;
                if(this.checkCalcEligible()){
                    var calculatedNum = this.doMath(parseFloat(this.inputArray[0].value),parseFloat(this.inputArray[2].value),this.inputArray[1].value); //would like to use a ref value instead of a hard number
                    this.inputArray = [];
                    createObj(calculatedNum,"numKey",self);
                    createObj(clickedInput,inputType,self);
                }else{
                    createObj(clickedInput,inputType,self);
                }
                this.updateUpperDisplay();
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
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
            case 'clear' :
                // if(clickedInput == "C"){//clear all condition
                //     this.inputArray = [];
                //     //call update display -for upper and lower display
                // }else{ //clear entry condition
                //     var lastArrayPos = this.inputArray.length-1;
                //     if(this.ceClicked || this.inputArray.length == 0){ //need to deactivate after new input has been inputted
                //         $log.warn('invalid');
                //         return;
                //     }
                //     else{
                //
                //     }
                // }
                // //need to take account for clear buttons
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

