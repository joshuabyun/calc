/**
 * Created by Gina on 7/12/2016.
 */
var my_caluculator = new calculator(display_value);

function display_value(type, value, item){
    //Take the value and display in the correct layout area within the DOM
    if(value == undefined){
        $('.screen_div').text("");
    }
    else{
        $('.screen_div').text(value);
    }
}
//Add click handlers to all buttons in the DOM, when called they do the following
$(document).ready(function(){
    $('.font_size > button').click(function(){
        //Defines a variable val equal to the value of the button pressed.
        var val = $(this).text();
        my_caluculator.addItem(val);
    })
});