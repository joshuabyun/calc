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
        input_array[array_position-1].value+=element.text();
        console.log(input_array[array_position-1].value); // to log current input and where it is being saved
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
        console.log(input_array[array_position].value); // to log current input and where it is being saved
        array_position++;
    }
}

function make_parameter(the_input_array){ //called whenever "=" is pressed
    var inner_answer;
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
    display_screen(input_array[input_array.length-1].value);
    console.log(input_array);
}

// function make_paramater(the_input_array) { //the_input_array is ultimately referring to input_array,
//     var formula_array = [""];
//     var formula_array_position = 0;
//     //get the value of each object and put it into an array.
//
//     for(var i =0; i<the_input_array.length;i++){ //pulling values from objects and inserting into an array based on the operator
//         if(the_input_array[i].type == "num_key"){
//             formula_array[formula_array_position] = input_array[i].value;
//         }
//         else if(input_array[i].type == "special_char"){
//             formula_array_position++;
//             formula_array[formula_array_position] = input_array[i].value;
//             formula_array_position++;
//             formula_array[formula_array_position] = '';
//         }
//     }
//     console.log(formula_array);
//     // //formula_array is an array of strings consist of numbers and operator which are the values of objects inside of the_input_array
//
//     //need to evaluate order of operation and put it in to an array
//     for(var j = 0; j<formula_array.length;j++){
//         if(the_input_array[j].type == "special_char"){
//             var num1 = parseFloat(formula_array[j-1]); //to change value into decimal
//             var num2 = parseFloat(formula_array[j+1]);
//             var operator = formula_array[j];
//             console.log("num1 : "+ num1);
//             console.log("num2 : " +num2);
//             console.log("operator : "+operator);
//             console.log(do_math(num1,num2,operator));
//             result = do_math(num1,num2,operator)
//             display_screen(result);
//         }
//     }
// }







/*--------------------------using just array ---------------------------*/
// function event_handler(){
//     $('.font_size').on('click','.num_key',function(){
//         insert_number($(this).text());
//     });
//     $('.font_size').on('click','.special_char',function(){
//         insert_special_char($(this).text());
//     });
//     $('.font_size').on('click','.equal_sign',function(){
//         equal_submit();
//     });
// }
// function insert_number(input){
//      input_array[array_position]+=input;
//     //display input_array[array_position]
// }
// function insert_special_char(input){
//     array_position++;
//     input_array[array_position]=input;
//     array_position++;
//     input_array[array_position]="";
//     //display input_array[array_position]
// }
// function equal_submit(){
//     do_math(input_array);
//     //display the answer
// }
//
// function do_math(data){
//
// }