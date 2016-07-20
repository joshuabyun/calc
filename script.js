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
function make_parameter(the_input_array){ //called whenever "=" is pressed
    var inner_answer;
    // for(var i = 0; i < the_input_array; i++){
    //     if(the_input_array[i].value == "X" || the_input_array[i].value == "/"){
    //                 inner_answer = do_math(parseFloat(the_input_array[i-1].value),parseFloat(the_input_array[i+1].value),the_input_array[i].value);
    //                 var b = new Object();
    //                 b.value = inner_answer;
    //                 b.type = "num_key";
    //                 the_input_array.splice(i-1,3,b);
    //                 i = -1;
    //             }
    // }
    //
    for(var i = 0; i < the_input_array.length; i++){
        if(the_input_array[i].value == "X" || the_input_array[i].value == "/"){
            inner_answer = do_math(parseFloat(the_input_array[i-1].value),parseFloat(the_input_array[i+1].value),the_input_array[i].value);
            var b = new Object();
            b.value = inner_answer;
            b.type = "num_key";
            the_input_array.splice(i-1,3,b);
            i = -1;
        }
    }
    for(var j = 0; j < the_input_array.length; j++){
        if(the_input_array[j].value == "+" || the_input_array[j].value == "-"){
            inner_answer = do_math(parseFloat(the_input_array[j-1].value),parseFloat(the_input_array[j+1].value),the_input_array[j].value);
            var b = new Object();
            b.value = inner_answer;
            b.type = "num_key";
            the_input_array.splice(j-1,3,b);
            j = -1; //when there is a math computation, set j to -1 so that next loop at line 63 starts fresh
            //if we set j instead of i, and delete line 60 and 70, we have to press "=" twice to run get the result of the function with 2 operations in same group ("+ , -" or "/ , *" )
            //because the if statement below checks for the length of the "new computed array"
        }
    }
    if(the_input_array.length == 1 && the_input_array[0].type == "num_key"){
        the_answer = the_input_array[0].value;
        console.log("the answer is : " + the_answer);
    }
}

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

