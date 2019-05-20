let startingNumber = 100;
let chosenNumber1 = 1;
// let chosenNumber2 = 2;
// let chosenNumber3 = 3;


let remainingNumber = startingNumber;

let count = 0;

console.log(remainingNumber + " " + count + " throw");
while (remainingNumber > 1) {

    count++;

    for (i = 1; i < remainingNumber; i++) {

        let diceThrow = Math.floor((Math.random() * 6) + 1);

        //  || diceThrow === chosenNumber3 || diceThrow === chosenNumber2
        if (diceThrow === chosenNumber1) {


            remainingNumber--;

        }


    }

    console.log(remainingNumber + " " + count + " throw");



}