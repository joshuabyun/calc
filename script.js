var app = angular.module('calcApp', []);
//{value: '1',type:num,flexible:0}
app.controller('calcController',function($log, calculate){
    //always keep the value as a string. just change the the type to number only calculating using Number();
    //need to create a function that creates a input object : when creating a number object. if the value is ".", the value should be "0."
    
    this.inputHistory = [
        {value: '0',
         type:'numKey',
         flexible:true}
    ];
    this.calcExpression = ['0'];
    this.lowerDisplay ='0';
    this.upperDisplay = '';
    $log.log('inputHistor on document laod', this.inputHistory);
    $log.log('inputHistor on document laod', this.calcExpression);
    
    this.checkCalcEligible = function(updateValType){
        if(updateValType == "operator"){
            if(calculate.validateExpressionToCalc(this.calcExpression)){
                var param1 = Number(this.calcExpression[0]);
                var param2 = Number(this.calcExpression[2]);
                var param3 = this.calcExpression[1];
                $log.log('calcEligible - this.calcExpression : ', this.calcExpression);
                var doMathOutput = calculate.doMath(param1,param2,param3);
                this.updateCalcExpression("splice",doMathOutput);
            }
        }
    };
    this.removeLastInputObj = function(){
        var lastNumberInputPos = this.inputHistory.length-1;
        this.inputHistory.splice(lastNumberInputPos,1);
        this.updateCalcExpression('remove');
    };
    this.insertInputObj = function(inputObj){
        this.inputHistory.push(inputObj);
        this.updateCalcExpression('insert',inputObj.value,inputObj.type);
        $log.info('updated inputHistory via newObj creation',this.inputHistory);
    };
    this.appendValToLastInput = function(numberInput){
        var inputHistoryLastPos = this.inputHistory.length-1;
        this.inputHistory[inputHistoryLastPos].value += numberInput;
        this.updateCalcExpression('append',this.inputHistory[inputHistoryLastPos].value);
        $log.info('updated inputHistory via numberAppend',this.inputHistory[inputHistoryLastPos].value);
    };
    this.updateCalcExpression = function(updateToPerform,updatedVal,updateValType){
        var calcExpressionLastPos = this.calcExpression.length-1;
        switch(updateToPerform){
            case "remove" :
                this.calcExpression.splice(calcExpressionLastPos,1);
                break;
            case "insert" :
                this.calcExpression.push(updatedVal);
                this.checkCalcEligible(updateValType);
                break;
            case "append" :
                this.calcExpression[calcExpressionLastPos] = updatedVal;
                break;
            case "clearAll":
                this.calcExpression = [];
                break;
            case "splice" :
                this.calcExpression.splice(0,3,updatedVal);
                break;
        }
        $log.info('updatedCalcExpression',this.calcExpression);
    };
    this.acceptEqual = function(){
        //check if the existing expression can be calculated [# op #]
    };
    this.acceptClear = function(clearVal,inputType){
        //check if its C or CE
        //use switch
        switch(clearVal){
            case "CE":
                //check previous input obj
                var lastInputType = this.inputHistory[this.inputHistory.length-1].type;
                switch(lastInputType){
                    case "numKey" :
                        this.removeLastInputObj();
                        var placeHolderInput1 = calculate.createInputObj('0',"numKey",true);
                        this.insertInputObj(placeHolderInput1);
                        //remove last number obj
                        //insert flexible 0
                        break;
                    case "operator":
                        var placeHolderInput2 = calculate.createInputObj('0',"numKey",true);
                        this.insertInputObj(placeHolderInput2);
                        //insert flexible 0
                        break;
                }
                break;
            case "C":
                this.inputHistory = [];
                this.updateCalcExpression("clearAll");
                var initInput = calculate.createInputObj("0","numKey",true);
                this.insertInputObj(initInput);
                break;
        }
    };
    this.acceptNum = function(numberInput,inputType){
        var lastInputPosition = this.inputHistory.length-1;
        if(calculate.validateExpressionInput(inputType,this.inputHistory[lastInputPosition].type)){
            var inputObj = calculate.createInputObj(numberInput,inputType,false);
            this.insertInputObj(inputObj);
            //okay to insert the input as a new obj
        }else{
            if(this.inputHistory[lastInputPosition].flexible){
                var inputObjFlex = calculate.createInputObj(numberInput,inputType,false);
                this.removeLastInputObj();
                this.insertInputObj(inputObjFlex);
                //replace last input number with current numberInput (create new obj)
            }else{
                if(calculate.validateNumber(numberInput,this.inputHistory[lastInputPosition].value)){
                    this.appendValToLastInput(numberInput);
                    //append the value to the last input
                }else{
                    //multiple decimal : error sound
                }
            }
        }
    };
    this.acceptOperator = function(operatorInput,inputType){
        var lastInputPosition = this.inputHistory.length-1;
        if(calculate.validateExpressionInput(inputType,this.inputHistory[lastInputPosition].type)){
            //okay to insert the input as a new obj
            var operatorObj = calculate.createInputObj(operatorInput,inputType,false);
            this.insertInputObj(operatorObj);
        }else{
            //consecutive operator : error sound
        }
    }
});

