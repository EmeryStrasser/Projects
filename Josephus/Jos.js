const input=document.getElementById('input');
const output=document.getElementById('output');




function processInput() {
  const inputList = input.value.split('\n');  
  console.log(inputList);
  
  const count = +inputList[0];
  // console.log(typeof count);
  
  for(let i=1; i<=count; i++) {
    console.log("Test1");
  	const item = inputList[i].split(' ');
    const Troops = +item[0];
    const skipSize = item[1];
    console.log(Troops);
    console.log(skipSize);
  
    const result = processItem(Troops, skipSize);
    output.innerHTML += result;
     output.innerHTML += '<br />';
    }
   
}



function processItem(Troops, skipSize){
    
    let currentPerson = 1;
    var TroopArray = new Array(0);
    TroopArray.length = Troops;
    setAll(TroopArray, 1);
    //
    
    for(l=1;l<TroopArray.length;l++){
        alert(TroopArray);
       for(q=1; q<=skipSize;q++){
       
            for(b=1; b<TroopArray.length;b++){
                if(currentPerson === TroopArray.length + 1){

                    currentPerson = 1;
                    
                    
                  }
            if(TroopArray[currentPerson + 1] === 1){
                
               // 
               currentPerson = currentPerson + 1;

        }

        
       
        break;
       }
       
    
    }
    TroopArray[currentPerson] = 0;
    
   }
   
    return TroopArray.indexOf(1) + 1;
}
    
    
function setAll(a, v) {
    var i, n = a.length;
    for (i = 0; i < n; ++i) {
        a[i] = v;
    }
}