/**
 * Created by Gina on 7/12/2016.
 */

var input_array = [];
var array_position = 0;
$(document).ready(event_handler);

function event_handler() {
    $('.num_div button, .operator_div button').click(function () {
        num_data_obj($(this));
    });
    $('.clear').click(function () {
        {
            if($(this).text() == "C"){
                console.log("hello");
            }
            else if($(this).text() == "CE"){
                console.log("bye");
            }
        }
    });
}


function num_data_obj (element){
    if(array_position>0 && element.attr('class')=='num_key' && input_array[array_position-1].type=='num_key'){
        input_array[array_position-1].value+=element.text();
        display_screen(input_array[array_position-1].value);
    }
    else{
        var a = new Object();
        a.value = element.text();
        a.type = element.attr('class');
        display_screen(a.value);
        if(a.type =="equal_sign"){
            make_parameter(input_array);
            return;
        }
        input_array[array_position] = a;
        array_position++;
    }
}

function make_parameter(the_input_array){
    for(var i = 0; i < the_input_array.length ; i++){
        if(the_input_array[i].type == "special_char"){
            var operator = the_input_array[i].value;
            console.log("operator position in the array is : " + i);
            console.log("operator is : " + operator);
            var num_one = the_input_array[i-1].value;
            console.log("num_one is : " + num_one);
            var num_two = the_input_array[i+1].value;
            console.log("num_two is : " + num_two);
            do_math(num_one, num_two, operator)
        }
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