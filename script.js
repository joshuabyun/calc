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
    var a = new Object();
    a.value = element.text();
    a.type = element.attr('class');
    if(a.type =="equal_sign"){
        create_formula_array();
        return;
    }
    input_array[array_position] = a;
    console.log(input_array);
    array_position++;
}
function create_formula_array(){
    var formula_array = [""];
    var formula_array_position = 0;
    //find operator
    ////in the future, see which operator needs to be computed first.
    //lump numbers in between the operator
    ////in the future, see if a number includes a decimal
    //////if includes decimal, need to make sure it only includes 1.
    //////if number starts with a decimal, make sure to tell the computer to assume there is 0 before the decimal.
    //if numbers are lumped together, compute the formula with two lumped numbers and one operator.
    for(var i = 0; i < input_array.length; i++){
        if(input_array[i].type == "num_key"){
            formula_array[formula_array_position] += input_array[i].value;
        }
        else if(input_array[i].type == "special_char"){
            formula_array_position++;
            formula_array[formula_array_position] = input_array[i].value;
            formula_array_position++;
            formula_array[formula_array_position] = '';
        }

    }
    console.log(formula_array);
}



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