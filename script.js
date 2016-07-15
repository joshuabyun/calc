/**
 * Created by Gina on 7/12/2016.
 */

var input_array = [];
var array_position = 0;
var operator;
var num_one;
var num_two;
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

function clear(){
    input_array = [];
    num_one = null;
    num_two = null;
    array_position = 0;
    display_screen(" ");
    console.log(input_array);
}
function clear_entry(){
    //need to use splice.
    input_array.splice(input_array.length-1);
    if(input_array.length == 0){
        clear();
        return;
    }
    display_screen(input_array[input_array.length-1].value);
    console.log(input_array);
}

function num_data_obj (element){ //making array of objects with type and value inside
    if(array_position>0 && element.attr('class')=='num_key' && input_array[array_position-1].type=='num_key'){
        console.log(input_array);
        input_array[array_position-1].value+=element.text();
        display_screen(input_array[array_position-1].value);
    }
    else{
        var a = new Object();
        a.value = element.text();
        a.type = element.attr('class');
        if(a.type =="equal_sign"){ //when equal sign is pressed
            make_parameter(input_array);
            display_screen(the_answer);
            return;
        }
        display_screen(a.value);
        input_array[array_position] = a;
        console.log(input_array);
        array_position++;
    }
}

function make_parameter(the_input_array){
    for(var i = 0; i < the_input_array.length ; i++){
        if(the_input_array[i].type == "special_char"){
            operator = the_input_array[i].value;
            console.log("operator position in the array is : " + i);
            console.log("operator is : " + operator);
            num_one = parseFloat(the_input_array[i-1].value);
            console.log("num_one is : " + num_one);
            num_two = parseFloat(the_input_array[i+1].value);
            console.log("num_two is : " + num_two);
            the_answer = do_math(num_one, num_two, operator);
            console.log("answer is = " + the_answer);
        }
    }
}

function display_screen(element){
    $('.screen_div').text(element);
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