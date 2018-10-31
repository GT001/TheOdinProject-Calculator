const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', process_events));

document.addEventListener('keydown',process_events)

var special = ["+","-","/","*","pow","bs","=", "C"];
var numbers = ["1","2","3","4","5","6","7","8","9","0","."];

var inline =document.getElementById("inline");
var result =document.getElementById("result");

function process_events(e){
    var key;
    if(e.key) {
        if (e.key == "Backspace"){
            key = "bs";  
        } else {
            key = e.key;
        }
    }
    else{
        key =e.path[0].id;
    }
    display_key(key);
}
var current_entry = "";

function display_key(key){
    var isNumber = (numbers.includes(key) && key != ".");
    var decimal = key ==".";
    var op = (special.includes(key)&& key != "C" && key != "bs")
    var bs = key == "bs";
    var c = key == "C";


}

function msg(str){
    console.log(str);
}