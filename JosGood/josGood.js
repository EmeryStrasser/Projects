const Troops=document.getElementById('TroopsNum');
const GapSize=document.getElementById('GapSize');
const output=document.getElementById('output');

function processInput(){
    var TroopArray = new Array(0);
    TroopArray.length = Troops.value;
    setAll(TroopArray, "Alive");
    let Alive = Troops.value;
    let CurrentPerson = -1;
    let Skipped = 0;
    
    while(Alive > 1){ //Is running until there is 1 person left
        Skipped = 0;
        while (Skipped != GapSize.value){ //Looping until the proper amount of people have been skipped
            CurrentPerson += 1;
                while (TroopArray[CurrentPerson] != "Alive") {  //Will repeat until the next peron is alive and not dead.
                    CurrentPerson += 1;
                    if(CurrentPerson > TroopArray.length){  //Checking if it needs to start at the front of the array
                        CurrentPerson = -1;
                    }
                }
            Skipped += 1;
        }
        TroopArray[CurrentPerson] = "Dead";
        Alive -= 1;
    }   
    output.innerHTML = TroopArray.indexOf("Alive") + 1;
}

function setAll(a, v) {
    var i, n = a.length;
    for (i = 0; i < n; ++i) {
        a[i] = v;
    }
}