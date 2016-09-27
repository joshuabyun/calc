var app = angular.module('calcApp', []);

app.controller('calcController',function($log, calculate){
    this.inputHistory = [];
    this.calcExpression = [];
    this.lowerDisplay ='';
    this.upperDisplay = '';

    this.acceptClear = function(){
        //if C
            //clear inputHistory, calcExpression
        //if CE
            //

    };
    this.acceptNum = function(){
        //check last clicked item
            //if there is none, insert the number to array
            //if C : treat it like if there was nothing

            //if operator clicked previously, insert the number to array
            //if equalSign : replace current number to clicked num

            //if CE : insert number to the array

            //if number :
                //check if currently clicked item = .
                    //if true, check if previous number has .
                        //true, return error
                    //if false, append to the previous number
    };
    this.acceptEqual = function(){
        //check if calcExpression consists of [#, op, #]
            //if true, calculate
            //clear current calcExpression array
            //return a number and insert to the array

            //else :return error to the screen : do not accept and other key
    };
    this.acceptOperator = function(){
        //check if current calcExpression has [#, op, #]
            //if true, calculate
            //clear current calcExpression array
            //return a number to the array
            //insert clicked operator

        //check previously clicked button
            //if operator
                //return error
            //if number
                //insert clicked operator to the array
            //if C
                //insert 0 to the array
                //insert clicked operator to the array
            //if CE
                //insert 0 to the array
                //insert clicked operator to the array
            //if equal
                //insert operator to the array
    }
});

