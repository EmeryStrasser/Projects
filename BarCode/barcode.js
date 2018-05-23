const input=document.getElementById('Input');
const output=document.getElementById('output');



function processInput(){

    if (/[a-zA-Z]/.test(input.value)) {
        alert('Please input only numbers')
        return;
      }

    var evens = 0;
    var odds = 0;

    var intoArray = input.value.split("").map(Number);
    if(intoArray.length != 13){

            alert("Needs a 13 digit number:  " + intoArray.length + " / 13");
            return;

        }

    console.log(intoArray);
    for(i=0;i<intoArray.length;i++){

        if(Number.isInteger((i + 1)/2) === true){
            evens = evens + intoArray[i];
            console.log(evens + " Even");

        } else {

            odds = odds+intoArray[i];
            console.log(odds+ " odd");

        }
   }
   if(Number.isInteger((odds+(evens*3))/10)){

        output.innerHTML = input.value + " is valid";


   }else{

        output.innerHTML = input.value + " is not valid";

   }

}

