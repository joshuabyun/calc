/**
 * Created by Gina on 7/12/2016.
 */

var input_array = [];
var array_position = 0;
var the_answer;

$(document).ready(event_handler);

function event_handler() {
    $('.num_div button, .operator_div button').click(function () {
        num_data_obj($(this));
    });
    $('.clear').click(function () {
        {
            if($(this).text() == "C"){
                clear();
            }
            else if($(this).text() == "CE"){
                clear_entry();
            }
        }
    });
}
function num_data_obj (element){ //making array of objects with type and value inside
    if(array_position>0 && element.attr('class')=='num_key' && input_array[array_position-1].type=='num_key'){
        //if second decimal is pressed, return (if first and last index of '.' the object is not equal, return)
        input_array[array_position-1].value+=element.text();
        if(input_array[array_position-1].value.indexOf('.') != input_array[array_position-1].value.lastIndexOf(".")){ //to prevent multiple decimal points input in one obj.
            var pos1 = input_array[array_position-1].value.indexOf('.');
            var substring = input_array[array_position-1].value.substring(0,pos1+1);
            var string = input_array[array_position-1].value;
            var new_string_val = input_array[array_position-1].value.replace(string , substring);
            input_array[array_position-1].value = new_string_val; //phpstorms calls the var new_string_val is redundant. Any other way to do this?
            console.log("multiple decimals inputted");
            return;
        }
        console.log("A new number has been added to the current object. New value is :" + input_array[array_position-1].value); // to log current input and where it is being saved
        display_screen(input_array[array_position-1].value);
    }
    else{
        var a = new Object();
        a.value = element.text();
        a.type = element.attr('class');
        if(a.type =="equal_sign"){ //when equal sign is pressed
            console.log("equal sign pressed");
            make_parameter(input_array);
            display_screen(the_answer);
            var c = new Object();
            c.value = the_answer;
            c.type = 'num_key';
            input_array = [];
            input_array[0] = c;
            array_position = 1;
            return;
        }
        display_screen(a.value);
        input_array[array_position] = a;
        console.log("A new object has been created. New value is : " + input_array[array_position].value); // to log current input and where it is being saved
        array_position++;
        if(input_array.length > 1 && input_array[array_position-2].type == "special_char" && input_array[array_position-1].type == "special_char"){ //to avoid consecutive operator input.
            //delete the previous operator object and decrement array_position by  1.
            input_array.splice(array_position-2,1);
            array_position--;
            console.log("Multiple operation inputted. The operator first added has been removed");
        }
    }
}

// --------------------LFZ Start
//JB : create a function that takes one parameter which is an array of objects. This function will check whether the parameter has operators.This function gets called whenever equal sign "=" is pressed, finds operator and calls do_math function. This function also prioritizes multiplication and division before addition and subtraction to follow order of operations.
//JB : create a local variable. This variable will temporarily store the answer of a simple three input computation (number, number, operator).
//JB : create a for loop that check for each object's value in the parameter
//JB : create an if statement. The if statement will check whether the object's value of the parameter is equal to "X" or "/"
//JB : if the statement's condition is true, call do_math function with three parameters (one at the found position, one before its position, one after the position) and assign the result to the local variable that we created in line 73.
//JB : create a new object and assign it to another new local variable
//JB : create a new property for the object we created in line 77, value, and assign the value of the variable from line 73
//JB : create a new property for the object we created in line 77, type, and give it a string value "num_key"
//JB : using splice method, remove 3 objects that were used to call do_math function and replace it with the object variable from line 77
//JB : set the variable from line 74,the one that was used to increment for-loop, equal to -1 so that the loop can repeat from position 0 again.


//JB : create a new for loop, separate from above to evaluate if there is + or  - operator in the parameter. The loop will perform same activities as the one above except it will search for + and  - instead. (this loop is NOT nested to the loop above)









//JB : After the second for-loop, create an if statement.The statement will check if the parameter's array length is equal to 1 and the object's type inside the array is equal to "num_key".
//JB  : If true, get the value of the object and assign it to the global variable the_answer.
//console.log the "the_answer"



//------------------------------LFZ Finish

function do_math(num1, num2, operator) {
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

function display_screen(element){
    $('.screen_div').text(element);
}
function clear(){
    input_array = [];
    array_position = 0;
    display_screen(" ");
    console.log(input_array);
}
function clear_entry(){
    input_array.splice(input_array.length-1);
    if(input_array.length == 0){
        clear();
        return;
    }
    array_position--;
    display_screen(input_array[input_array.length-1].value);
    console.log("An object has been cleared. Remaining objects are : " + input_array);
}

