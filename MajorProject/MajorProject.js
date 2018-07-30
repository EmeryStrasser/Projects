//variables for the table itself
let dateCell;
let odomStartCell;
let odomFinCell;
let weatherCondCell;
let roadCondCell;
let trafficCondCell;
let startTimeCell;
let finishTimeCell;
let instructorIdCell;
let licenseNumCell;
let hoursDrivenDayCell;
let hoursDrivenNightCell;

//Individual cell for a delete button for formatting sake.
let deleteCell;

let pageFromInstructor;



//An object created for the use of firebase to save automatticaly online.

// let fire = {
//   instructorIdArray: [], //All the arrays which are in use for this project with the saved and appropiate data inside.
//   instructorNameArray: [],
//   logbookArray: []
// }

// let instructorIdArray = fire.instructorIdArray; //For ease of programming, variable is created which is equal to the firebase reference.
// let instructorNameArray = fire.instructorNameArray;
// let logbookArray = fire.logbookArray;


let instructorIdArray = [];
let instructorNameArray = [];
let logbookArray = [];


let database = firebase.database();

let logRef = database.ref('/logbook');
let instIDRef = database.ref('/instructorsID');
let instNameRef = database.ref('/instructorsName');


let newLog; //A variabel which will later be used as an object for temporary data stroage before movement to an array

let totalHoursDriven = 0; //A variabel which holds the totale hours driven
let progressionPercentage = 0;//Calculating the percentage


logRef.once('value').then((data) => { logbookArray = data.val(); });
instIDRef.once('value').then((data) => { instructorIdArray = data.val(); });
instNameRef.once('value').then((data) => { instructorNameArray = data.val(); });




function reload() {
  if (logbookArray == null) logbookArray = [];
  logRef.update(logbookArray);
  document.getElementById('tbody').innerHTML = ''; //Accesing the logBook
  var testRow = document.getElementById('tbody').insertRow(0);
  testRow.classList.add("w3-light-grey");

  for (i = 0; i < logbookArray.length; i++) { //Looping throught the array

    var LogTable = document.getElementById("logbook"); //Accesing logbooks
    var row = LogTable.insertRow(LogTable.rows.length);//Inserting a new row
    dateCell = row.insertCell(0); //Inserting the different cells 
    odomStartCell = row.insertCell(1);
    odomFinCell = row.insertCell(2);
    weatherCondCell = row.insertCell(3);
    roadCondCell = row.insertCell(4);
    trafficCondCell = row.insertCell(5);
    startTimeCell = row.insertCell(6);
    finishTimeCell = row.insertCell(7);
    instructorIdCell = row.insertCell(8);
    licenseNumCell = row.insertCell(9);
    hoursDrivenDayCell = row.insertCell(10);
    hoursDrivenNightCell = row.insertCell(11);
    deleteCell = row.insertCell(12);

    fillCells(i); //calling function to fill the cells with appropiate data, takes parameter of the array index.

  }

}





goToPage(mainPage);//Calls code to change page at beginning of program

function pageFromInstructorPage(pageWanted) {

  pageFromInstructor = pageWanted;


}





/** This function is used to hide all the different pages and then shows a single page based on the parameter
 Parameters: 
   pagenumber(string) - Allows the choice of choosing what page to show
 Return: 
   Returns null */

function goToPage(pageNumber) {

  document.querySelectorAll('.pages').forEach((e) => e.hidden = true); //hides all pages
  pageNumber.hidden = false;//shows page needed

}

function addNewInstructor() { //Adds the inputted instructors into an array for later user.

  if (instructorNameArray == null) instructorNameArray = [];
  if (instructorIdArray == null) instructorIdArray = [];
  instructorNameArray.push(document.getElementById("instructorName").value); //pushing the inputs into the arrays
  instructorIdArray.push(document.getElementById('instructorId').value);

  document.getElementById('instructors');

  var opt = instructorIdArray[instructorIdArray.length - 1];
  var el = document.createElement("option");
  el.textContent = opt;
  el.value = opt;
  document.getElementById('instructors').appendChild(el);
  //document.getElementById('instructorsQuery').appendChild(el);

  goToPage(pageFromInstructor);

}

function checkCorrectPage() { //Checking if all formatting is corrct and correct data

  console.log(document.getElementById('TimeFinish').value - document.getElementById('TimeStart').value);

  if (document.getElementById('Date').value === "") { //Checking if fields are empty

    alert("Please enter date");
  }
  else if (document.getElementById('OdometerStart').value === "") {

    alert("Please enter odometer starting value");

  }
  else if (document.getElementById('OdometerFinish').value === "") {

    alert("Please enter odometer finishing value");

  }
  else if (document.getElementById('weather').value === "") {
    alert("Please enter weather conditions");

  }

  else if (document.getElementById('roadCondition').value === "") {

    alert("Please enter road conditions");

  }
  else if (document.getElementById('traffic').value === "") {
    console.log("Test6");
    alert("Please enter traffic conditions");
  }
  else if (document.getElementById('TimeStart').value === "") {
    console.log("Test7");
    alert("Please enter starting time");
  }
  else if (document.getElementById('TimeFinish').value === "") {
    console.log("Test8");
    alert("Please enter finishing time");
  }
  else if (document.getElementById('instructors').value === "") {
    console.log("Test9");
    alert("Please enter instructor ID");

  }
  else if (document.getElementById('LicenseNumber').value === "") {
    console.log("Test9");
    alert("Please enter license number");

  }
  else if (document.getElementById('HoursDay').value != "" || document.getElementById('HoursDay').value != "") {
    console.log("Test10");
    addNewRow(); //After checking is correct, a new row is added


  }

  else {
    alert("Please enter hours driven");


  }
}

function deleteRow(rowNumber) { //Deleteing element from an array and updating the table

  if (confirm('Are you sure you want to remove from database')) {
    logbookArray.splice(rowNumber, 1); //Taking out of array



    document.getElementById('tbody').innerHTML = ''; //Accesing the logBook

    var queryNewRow = document.getElementById('tbody').insertRow(0);
    queryNewRow.classList.add("w3-light-grey");

    for (i = 0; i < logbookArray.length; i++) { //Looping throught the array

      var LogTable = document.getElementById("logbook"); //Accesing logbooks
      var row = LogTable.insertRow(LogTable.rows.length);//Inserting a new row
      dateCell = row.insertCell(0); //Inserting the different cells 
      odomStartCell = row.insertCell(1);
      odomFinCell = row.insertCell(2);
      weatherCondCell = row.insertCell(3);
      roadCondCell = row.insertCell(4);
      trafficCondCell = row.insertCell(5);
      startTimeCell = row.insertCell(6);
      finishTimeCell = row.insertCell(7);
      instructorIdCell = row.insertCell(8);
      licenseNumCell = row.insertCell(9);
      hoursDrivenDayCell = row.insertCell(10);
      hoursDrivenNightCell = row.insertCell(11);
      deleteCell = row.insertCell(12);

      fillCells(i); //calling function to fill the cells with appropiate data, takes parameter of the array index.

    }
    logRef.update(logbookArray);
  }

}

function fillCells(currentRow) { //Function to fill in respectvie cells

  dateCell.innerHTML = logbookArray[currentRow].date; //Accesing the cell and filling in the cell with values from the array and the objects
  odomStartCell.innerHTML = logbookArray[currentRow].odomArrayStart;
  odomFinCell.innerHTML = logbookArray[currentRow].odomArrayFinish;
  weatherCondCell.innerHTML = logbookArray[currentRow].weather;
  roadCondCell.innerHTML = logbookArray[currentRow].road;
  trafficCondCell.innerHTML = logbookArray[currentRow].traffic;
  startTimeCell.innerHTML = logbookArray[currentRow].startTimeArray;
  finishTimeCell.innerHTML = logbookArray[currentRow].finsishTimeArray;
  instructorIdCell.innerHTML = logbookArray[currentRow].instructorArrayValue;
  licenseNumCell.innerHTML = logbookArray[currentRow].license;
  hoursDrivenDayCell.innerHTML = logbookArray[currentRow].hoursDrivenArray;
  hoursDrivenNightCell.innerHTML = logbookArray[currentRow].hoursDrivenNightArray;
  deleteCell.innerHTML = "<button class='w3-button w3-round-xlarge' onclick='deleteRow(" + currentRow + ")'>Remove</button>" //Adding in a button which calls the function to delete a row and takes a parameter of the appropiate row



}


function querySearch() {//Function to search the query for respective data

  document.getElementById('tbody').innerHTML = '';//clears the logbook table

  var queryNewRow = document.getElementById('tbody').insertRow(0);
  queryNewRow.classList.add("w3-light-grey");

  for (i = 0; i < logbookArray.length; i++) {//looping through the different rows

    var LogTable = document.getElementById("logbook");
    var row = LogTable.insertRow(LogTable.rows.length);//Creating new row
    dateCell = row.insertCell(0);//Creating new cells
    odomStartCell = row.insertCell(1);
    odomFinCell = row.insertCell(2);
    weatherCondCell = row.insertCell(3);
    roadCondCell = row.insertCell(4);
    trafficCondCell = row.insertCell(5);
    startTimeCell = row.insertCell(6);
    finishTimeCell = row.insertCell(7);
    instructorIdCell = row.insertCell(8);
    licenseNumCell = row.insertCell(9);
    hoursDrivenDayCell = row.insertCell(10);
    hoursDrivenNightCell = row.insertCell(11);
    deleteCell = row.insertCell(12);
    deleteCell.innerHTML = "<button onclick='deleteRow(" + i + ")'>X</button>"//adding a delete button which takes the current row as the paremeter
    if (document.getElementById("DateQuery").value != "") {//Checking if input is empty

      if (logbookArray[i].date === document.getElementById("DateQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);

      }

    }
    else if (document.getElementById("OdometerStartQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].odomArrayStart === document.getElementById("OdometerStartQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);

      }

    }
    else if (document.getElementById("OdometerFinishQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].odomArrayFinish === document.getElementById("OdometerFinishQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);

      }

    }
    else if (document.getElementById("TimeStartQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].startTimeArray === document.getElementById("TimeStartQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);

      }

    }
    else if (document.getElementById("TimeFinishQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].finsishTimeArray === document.getElementById("TimeFinishQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);

      }

    }
    else if (document.getElementById("instructorsQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].instructorArray === document.getElementById("instructorsQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);

      }

    }
    else if (document.getElementById("LicenseNumberQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].license === document.getElementById("LicenseNumberQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);

      }

    }
    else if (document.getElementById("HoursDayQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].hoursDrivenArray === document.getElementById("HoursDayQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);

      }

    }
    else if (document.getElementById("HoursNightQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].hoursDrivenNightArray === document.getElementById("HoursNightQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);

      }

    }
    else if (document.getElementById("weatherQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].weather === document.getElementById("weatherQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);

      }

    }
    else if (document.getElementById("roadConditionQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].road === document.getElementById("roadConditionQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);

      }

    }
    else if (document.getElementById("trafficQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].traffic === document.getElementById("trafficQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);

      }

    }
    else {
      fillCells(i);


    }
  }
  goToPage(logbookPage); //Going to the logbook

}

function addNewRow() { //Adding in a new row
  document.getElementById('tbody').innerHTML = ''; //Clearing table

  var queryNewRow = document.getElementById('tbody').insertRow(0);
  queryNewRow.classList.add("w3-light-grey");


  newLog = {//Adding in the inputted data into an object
    date: document.getElementById('Date').value,
    odomArrayStart: document.getElementById('OdometerStart').value,
    odomArrayFinish: document.getElementById('OdometerFinish').value,
    weather: document.getElementById('weather').value,
    road: document.getElementById('roadCondition').value,
    traffic: document.getElementById('traffic').value,
    startTimeArray: document.getElementById('TimeStart').value,
    finsishTimeArray: document.getElementById('TimeFinish').value,
    instructorArrayValue: document.getElementById('instructors').value,
    license: document.getElementById('LicenseNumber').value,
    hoursDrivenArray: document.getElementById('HoursDay').value,
    hoursDrivenNightArray: document.getElementById('HoursNight').value

  }


  if (logbookArray == null) logbookArray = [];
  logbookArray.push(newLog);//Adding the object into an array

  logRef.update(logbookArray);
  console.log(logbookArray[logbookArray.length - 1]);
  console.log(logbookArray);

  for (i = 0; i < logbookArray.length; i++) {//Looping through all values in array

    var LogTable = document.getElementById("logbook");
    var row = LogTable.insertRow(LogTable.rows.length);
    dateCell = row.insertCell(0);
    odomStartCell = row.insertCell(1);
    odomFinCell = row.insertCell(2);
    weatherCondCell = row.insertCell(3);
    roadCondCell = row.insertCell(4);
    trafficCondCell = row.insertCell(5);
    startTimeCell = row.insertCell(6);
    finishTimeCell = row.insertCell(7);
    instructorIdCell = row.insertCell(8);
    licenseNumCell = row.insertCell(9);
    hoursDrivenDayCell = row.insertCell(10);
    hoursDrivenNightCell = row.insertCell(11);
    deleteCell = row.insertCell(12);

    fillCells(i); //filling the cells with data



  }


  calculateStats();

  document.getElementById('Date').value = ""; //clearing the data in the input form for later use
  document.getElementById('OdometerStart').value = "";
  document.getElementById('OdometerFinish').value = "";
  document.getElementById('roadCondition').value = "";
  document.getElementById('traffic').value = "";
  document.getElementById('TimeStart').value = "";
  document.getElementById('TimeFinish').value = "";
  document.getElementById('instructors').value = "";
  document.getElementById('LicenseNumber').value = "";
  document.getElementById('HoursDay').value = "";
  document.getElementById('HoursNight').value = "";

  goToPage(logbookPage);//going back to the logbook

}

function calculateStats() {




  totalHoursDriven += Number(document.getElementById('HoursDay').value) + Number(document.getElementById('HoursNight').value);
  document.getElementById('currentHours').innerHTML = totalHoursDriven;

  progressionPercentage = (totalHoursDriven / 120) * 100;
  console.log(progressionPercentage);
  document.getElementById('progression').style.width = progressionPercentage + "%";

}



