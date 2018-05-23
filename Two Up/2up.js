const input=document.getElementById('Input');
const output=document.getElementById('output');

var initialBet;
var value1;
var value2;
var currenAmount = 0;

function processInput(){
    currenAmount = 0;
    output.innerHTML = "";
    if(Math.random() < 0.5){
        initialBet = "H"
    }else{
        initialBet = "T"
    }
    for(i = 0; i < +input.value ; i++){
        if(Math.random() < 0.5){
            value1 = "H"
        }else{
            value1 = "T"
        }
        if(Math.random() < 0.5){
            value2 = "H"
        }else{
            value2 = "T"
        }
        if(value1 === initialBet && value2 === initialBet){
            output.innerHTML += "<span style='color:Chartreuse '>" + initialBet + " " + value1 + " " + value2 + " " + "Win </span>";
            output.innerHTML += '<br/>';
            currenAmount = 1;
        }
        else if(value1 != initialBet && value2 != initialBet){
            output.innerHTML += "<span style='color:OrangeRed '>" + initialBet + " " + value1 + " " + value2 + " " + "Lose </span>";
            output.innerHTML += '<br/>';
            currenAmount = 1;
        }else{
            if(currenAmount === 5){
                output.innerHTML += "<span style='color:OrangeRed '>" + initialBet + " " + value1 + " " + value2 + " " + "Lose: 5 odds</span>";
                output.innerHTML += '<br/>';
                currenAmount = 1;
            }else{  output.innerHTML += initialBet + " " + value1 + " " + value2 + " " + "Odd";
                output.innerHTML += '<br/>';

                currenAmount += 1;
            }
        }
    }
}