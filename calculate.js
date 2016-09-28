app.factory('calculate',function($log){
    var calculatorFunc = {};
    calculatorFunc.validateExpressionInput = function(currentInputType,previousInputType){
        if(currentInputType != previousInputType){
            return true;
        }
    };
    calculatorFunc.validateNumber = function(currentInputVal,previousInputVal){
        if(previousInputVal.indexOf('.') == -1){
            return true;
        }else{
            if(currentInputVal != "."){
                return true;
            }
        }
    };
    calculatorFunc.createInputObj = function(inputValue,inputType,flexibleVal){
      var inputObj = {};
      switch(inputValue){
          case ".":
              inputObj.value = "0.";
              inputObj.type = inputType;
              inputObj.flexible = flexibleVal;
              break;
          case "0":
              inputObj.value = "0.";
              inputObj.type = inputType;
              inputObj.flexible = flexibleVal;
              break;
          default :
              inputObj.value = inputValue;
              inputObj.type = inputType;
              inputObj.flexible = flexibleVal;
              break;
      }
      return inputObj;      
    };
    calculatorFunc.validateExpressionToCalc = function(calcExpression){
        if(Number(calcExpression[0]).toString() != 'NaN' && Number(calcExpression[2]).toString() != 'NaN'){///nan is a number
            if(calcExpression[1] == "/" || calcExpression[1] == 'X' || calcExpression[1] =='-' || calcExpression[1] =='+'){
                if(typeof(Number(calcExpression[2]) == "number")){
                        return true;
                }
            }
        }
    };
    //params  (type:number, type:number, type:string)
    calculatorFunc.doMath = function(num1, num2, operator){
        var answer;
        switch (operator){
            case '+':
                answer = num1 + num2;
                break;
            case '-':
                answer = num1 - num2;
                break;
            case 'X':
                answer = num1 * num2;
                break;
            case '/':
                answer = num1 / num2;
                if(num2 == 0){
                    return "Error";
                }
                break;
        }
        return answer.toString();
    };
    return calculatorFunc;
});