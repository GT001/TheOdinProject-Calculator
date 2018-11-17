const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', process_events));

document.addEventListener('keydown',process_events)

var special = ["+","-","/","*"];
var numbers = ["1","2","3","4","5","6","7","8","9","0"];

var inline =document.getElementById("inline");
var result =document.getElementById("result");

let inline_numbers =[];
let inline_ops = [];
let carry_over = false;

function display_key(key){
    var isNumber = (numbers.includes(key));
    var decimal = key ==".";
    var op = (special.includes(key) || key == "^" || key == "^0.5")
    var bs = key == "bs";
    var c = key == "C";
    var equal = key == "=";
    
    if(carry_over){
        inline.textContent = "";
        carry_over = false;
        inline_numbers = [];
        if(isNumber){
            result.textContent = "0";
            
        }
    }
    
    if( c ){
        //clear  
        inline_numbers = [];
        inline_ops = [];
        result.textContent="0";
        inline.textContent="";
        carry_over = false;

    } else if (isNumber){
            if(result.textContent == ""){ 
                
                result.textContent += key;
            } else {
                
                result.textContent = (result.textContent != "0" ?  result.textContent+ key : key);
            }
    } else if (decimal){
        if( result.textContent.indexOf(".") < 0){
            if (result.textContent == ""){
                
                result.textContent = "0.";
            } else {
                
                result.textContent += ".";
            }
        } // do nothing if .  is in the string
        
    } else if (op){
        

            if( (special.includes(inline.textContent[inline.textContent.length-1]) || inline.textContent[inline.textContent.length-1] == "^" ||
            inline.textContent.substr(inline.textContent.length-4, inline.textContent.length-1) == "^0.5" ) && result.textContent == "0"){
                // last Char(s) is op and no input 
                // replace char(s) dn do nothing
                if( inline.textContent.substr(inline.textContent.length-4, inline.textContent.length-1) == "^0.5"){
                    inline.textContent = inline.textContent.substr(0,inline.textContent.length - 4) +key;
                    inline_ops[inline_ops.length - 1 ] = key;
                } else {
                    inline.textContent = inline.textContent.substr(0,inline.textContent.length - 1) +key;
                    inline_ops[inline_ops.length - 1 ] = key;
                }
            } else {
                
                inline.textContent += result.textContent + key;
                if(result.textContent.indexOf(".") == -1){
                    inline_numbers.push( parseInt(result.textContent) );
                } else {
                    inline_numbers.push( parseFloat(result.textContent) );
                }
                inline_ops.push(key);
                result.textContent ="0";
                
            }

    } else if (bs){
        if(result.textContent.length>1){

            result.textContent = result.textContent.substr(0, result.textContent.length -1);
        } else {
            
            result.textContent = "0";
        }
    } else if (equal) {
        if(inline_ops[inline_ops.length - 1] != "^0.5" && (inline_ops[inline_ops.length - 1] != "/")){
						inline_numbers.push((result.textContent.indexOf(".") > 0 ? parseFloat(result.textContent) : parseInt(result.textContent)));
            inline.textContent += result.textContent;
            result.textContent = process_arrays();
        } else if((inline_ops[inline_ops.length - 1] == "/" && result.textContent != "0" )){
            inline_numbers.push((result.textContent.indexOf(".") < 0 ? parseFloat(result.textContent) : parseInt(result.textContent)));
            inline.textContent += result.textContent;
            result.textContent = process_arrays();
        } else if( inline_ops[inline_ops.length - 1] == "/" && result.textContent == "0"){
            alert("Division by zero!");
            //reak;
        } else {
            result.textContent = process_arrays();
        }
        
    }
}
function process_arrays(){
    let i;
    msg(inline_numbers)
    msg(inline_ops)
    while( inline_ops.indexOf("^0.5") >= 0){
        i = inline_ops.indexOf("^0.5");
        inline_numbers.splice(i+1,0, sqr(inline_numbers[i]));
        inline_numbers.splice(i, 1);
        inline_ops.splice(i, 1);
    }
    while( inline_ops.indexOf("^") >= 0){
        i = inline_ops.indexOf("^");
        inline_numbers.splice(i+2,0, pow(inline_numbers[i], inline_numbers[i + 1]));
        inline_numbers.splice(i, 2);
        inline_ops.splice(i, 1);
    }
    while( inline_ops.indexOf("*") >= 0){
        i = inline_ops.indexOf("*");
        inline_numbers.splice(i+2,0, multiply(inline_numbers[i], inline_numbers[i + 1]));
        inline_numbers.splice(i, 2);
        inline_ops.splice(i, 1);
    }
    while( inline_ops.indexOf("/") >= 0){
        i = inline_ops.indexOf("/");
        inline_numbers.splice(i+2,0, divide(inline_numbers[i], inline_numbers[i + 1]));
        inline_numbers.splice(i, 2);
        inline_ops.splice(i, 1);
    }
    while( inline_ops.indexOf("-") >= 0){
        i = inline_ops.indexOf("-");
        inline_numbers.splice(i+2,0, subtract(inline_numbers[i], inline_numbers[i + 1]));
        inline_numbers.splice(i, 2);
        inline_ops.splice(i, 1);
    }
    while( inline_ops.indexOf("+") >= 0){
        i = inline_ops.indexOf("+");
        inline_numbers.splice(i+2,0, add(inline_numbers[i], inline_numbers[i + 1]));
        inline_numbers.splice(i, 2);
        inline_ops.splice(i, 1);
    }
    if (inline_numbers[0] % parseInt(inline_numbers[0]) != 0 ){
        inline_numbers[0] =  (inline_numbers[0]).toFixed(2)  
    }
    
    carry_over = true;
    return inline_numbers[0];
    
}

function add(a, b) { return a+b;}
function subtract(a, b) { return a-b;}
function multiply(a, b) { return a*b;}
function divide(a, b) { return a/b;}
function pow(a, b) { return Math.pow(a, b);}
function sqr(a) { return Math.sqrt(a);}

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
function msg (str){
    console.log(str);
}