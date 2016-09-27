app.factory('calculate',function($log){
    var calculatorFunc = {};


    var doMath = function(num1, num2, operator){                            //actual calculation
        $log.log(num1, num2, operator);
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