const String1=document.getElementById('String1');
const String2=document.getElementById('String2');
const output=document.getElementById('output');

function processInput(){

var NewString1 = String1.value.replace(/[^A-Za-z]/g, "");
var NewString2 = String2.value.replace(/[^A-Za-z]/g, "");

NewString1 = NewString1.toUpperCase();
NewString2 = NewString2.toUpperCase();

var seperateCharacter1 = NewString1.split("");
var seperateCharacter2 = NewString2.split("");

seperateCharacter1.sort();
seperateCharacter2.sort();

var result1 = seperateCharacter1.join();
var result2 = seperateCharacter2.join();
console.log(result1);
console.log(result2);

if(result1 === result2){
    output.innerHTML = String1.value + " is an anagram of " + String2.value;
} else if(result1 != result2){
    output.innerHTML = String1.value + " is not an anagram of " + String2.value;
}
}