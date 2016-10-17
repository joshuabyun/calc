var app = angular.module('calcApp', []);
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
    this.removeLastInputObj = function(){
        var lastNumberInputPos = this.inputHistory.length-1;
        this.inputHistory.splice(lastNumberInputPos,1);
        this.updateCalcExpression('remove');
    };
    this.insertInputObj = function(inputObj){
        this.inputHistory.push(inputObj);
        this.updateCalcExpression('insert',inputObj.value);
        $log.info('updated inputHistory via newObj creation',this.inputHistory);
    };
    this.appendValToLastInput = function(numberInput){
        var inputHistoryLastPos = this.inputHistory.length-1;
        this.inputHistory[inputHistoryLastPos].value += numberInput;
        this.updateCalcExpression('append',this.inputHistory[inputHistoryLastPos].value);
        $log.info('updated inputHistory via numberAppend',this.inputHistory[inputHistoryLastPos].value);
    };
    this.updateCalcExpression = function(updateToPerform,updatedVal){
        var calcExpressionLastPos = this.calcExpression.length-1;
        switch(updateToPerform){
            case "remove" :
                this.calcExpression.splice(calcExpressionLastPos,1);
                break;
            case "insert" :
                this.calcExpression.push(updatedVal);

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
    this.callDoMath = function(calcExpression){
        var param1 = Number(calcExpression[0]);
        var param2 = Number(calcExpression[2]);
        var param3 = calcExpression[1];
        return calculate.doMath(param1,param2,param3);
    };
    this.acceptEqual = function(){
        if(calculate.validateExpressionToCalc(this.calcExpression) && this.calcExpression.length == 3){
            var finalOutputVal = this.callDoMath(this.calcExpression);
            console.log("finalOutputVal : ",finalOutputVal);
            this.updateCalcExpression("clearAll");
            this.inputHistory = [];
            var finalOutputObj = calculate.createInputObj(finalOutputVal,"numKey",true);
            this.insertInputObj(finalOutputObj);
            if(this.calcExpression[this.calcExpression.length-1] == "0."){
                this.lowerDisplay = "0";
            }else{
                this.lowerDisplay = this.calcExpression[this.calcExpression.length-1];
            }
            this.upperDisplay = "";
        }
    };
    this.acceptNum = function(numberInput,inputType){
        var lastInputPosition = this.inputHistory.length-1;
        if(calculate.validateExpressionInput(inputType,this.inputHistory[lastInputPosition].type)){
            var inputObj = calculate.createInputObj(numberInput,inputType,false);
            this.insertInputObj(inputObj);
            this.lowerDisplay = this.calcExpression[this.calcExpression.length-1];
            //okay to insert the input as a new obj
        }else{
            if(this.inputHistory[lastInputPosition].flexible){
                var inputObjFlex = calculate.createInputObj(numberInput,inputType,false);
                this.removeLastInputObj();
                this.insertInputObj(inputObjFlex);
                this.lowerDisplay = this.calcExpression[this.calcExpression.length-1];
                //replace last input number with current numberInput (create new obj)
            }else{
                if(calculate.validateNumber(numberInput,this.inputHistory[lastInputPosition].value)){
                    this.appendValToLastInput(numberInput);
                    this.lowerDisplay = this.calcExpression[this.calcExpression.length-1];
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
            //check if last number has decimal at the end.
            //then change the value of the last number to .0
            if(this.inputHistory[this.inputHistory.length-1].value.indexOf(".") == this.inputHistory[this.inputHistory.length-1].value.length-1){
                this.appendValToLastInput("0");
            }
            var operatorObj = calculate.createInputObj(operatorInput,inputType,false);
            this.insertInputObj(operatorObj);
            if(calculate.validateExpressionToCalc(this.calcExpression)){
                this.updateCalcExpression("splice",this.callDoMath(this.calcExpression));
            }
            this.lowerDisplay = this.calcExpression[0];
            this.upperDisplay = "";
            for(var index in this.inputHistory){
                this.upperDisplay += this.inputHistory[index].value;
            }
        }else{
            //consecutive operator : error sound
        }
    };
    this.acceptClear = function(clearVal,inputType){
        switch(clearVal){
            case "CE":
                //check previous input obj
                var lastInputType = this.inputHistory[this.inputHistory.length-1].type;
                switch(lastInputType){
                    case "numKey" :
                        this.removeLastInputObj();
                        var placeHolderInput1 = calculate.createInputObj('0',"numKey",true);
                        this.insertInputObj(placeHolderInput1);
                        if(this.calcExpression[this.calcExpression.length-1] == "0."){
                            this.lowerDisplay = "0";
                        }else{
                            this.lowerDisplay = this.calcExpression[this.calcExpression.length-1];
                        }
                        break;
                    case "operator":
                        var placeHolderInput2 = calculate.createInputObj('0',"numKey",true);
                        this.insertInputObj(placeHolderInput2);
                        this.lowerDisplay = this.calcExpression[this.calcExpression.length-1];
                        break;
                }
                break;
            case "C":
                this.inputHistory = [];
                this.updateCalcExpression("clearAll");
                var initInput = calculate.createInputObj("0","numKey",true);
                this.insertInputObj(initInput);
                this.upperDisplay = "";
                this.lowerDisplay = "0";
                break;
        }
    };
});

