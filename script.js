/**
 * Created by Gina on 7/12/2016.
 */
var my_caluculator;

function display_value(type, value, item){
    //Take the value and display in the correct layout area within the DOM
    if(value == undefined){
        $('.screen_div').text("");
    }
    else{
        $('.screen_div').text(value);
    }
    //The display of the calculation will be up to each students interpretation of how a calculator should look. If you need ideas look at your calculator on your phone.
}

my_caluculator = new calculator(display_value);

//Add click handlers to all buttons in the DOM, when called they do the following
$(document).ready(function(){
   $('.font_size').on('click',function(){
       //Defines a variable val equal to the value of the button pressed.
       var val = $(this).text();
       //*Example : * if "=" button was pressed then the value of the variable above would be a string "=";
       my_caluculator.addItem(val);
   })
});