/**
 * Created by Gina on 7/12/2016.
 */
var input_array = [""];
var array_position = 0;
$(document).ready(event_handler);
function event_handler(){
    $('.font_size').on('click','.num_key',function(){
        insert_number($(this).text());
    });
    $('.font_size').on('click','.special_char',function(){
        insert_special_char($(this).text());
    });
}
function insert_number(input){
     input_array[array_position]+=input;
     console.log(input_array);
}
function insert_special_char(input){
    array_position++;
    input_array[array_position]=input;
    array_position++;
    input_array[array_position]="";
    console.log(input_array);
}
