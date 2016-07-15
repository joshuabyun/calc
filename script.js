/**
 * Created by Gina on 7/12/2016.
 */

var input_array = [];
var array_position = 0;
$(document).ready(event_handler);

function event_handler(){
    $('.num_div button, .operator_div button').click(function(){
        num_data_obj($(this));
    });
}
function num_data_obj (element){
    if(array_position>0 && element.attr('class')=='num_key' && input_array[array_position-1].type=='num_key'){
        input_array[array_position-1].value+=element.text();
    }
    else{
        var a = new Object();
        a.value = element.text();
        a.type = element.attr('class');
        if(a.type =="equal_sign"){
            make_paramater(input_array);
            return;
        }
        input_array[array_position] = a;
        array_position++;
    }
}
function make_paramater(the_input_array) { //the_input_array is ultimately referring to input_array, which is array of objects
    var formula_array = [""];
    var formula_array_position = 0;
    //get the value of each object and put it into an array.

    for(var i =0; i<the_input_array.length;i++){
        if(the_input_array[i].type == "num_key"){
            formula_array[formula_array_position] = input_array[i].value;
        }
        else if(input_array[i].type == "special_char"){
            formula_array_position++;
            formula_array[formula_array_position] = input_array[i].value;
            formula_array_position++;
            formula_array[formula_array_position] = '';
        }
    }
    console.log(formula_array);
    // //formula_array is an array of strings consist of numbers and operator which are the values of objects inside of the_input_array
    for(var j = 0; j<formula_array.length;j++){
        if(the_input_array[j].type == "special_char"){
            var num1 = parseInt(formula_array[j-1]);
            var num2 = parseInt(formula_array[j+1]);
            var operator = formula_array[j];
            console.log(parseInt(num1));
            console.log(parseInt(num2));
            console.log(operator);
            console.log(do_math(num1,num2,operator));

        }
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
        case '*':
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