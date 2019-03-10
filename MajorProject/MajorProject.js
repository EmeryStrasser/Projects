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

let instructorIdArray = [];
// let instructorNameArray = [];
let logbookArray = [];


let database = firebase.database();

let logRef = database.ref('/logbook');
let instIDRef = database.ref('/instructorsID');
let instNameRef = database.ref('/instructorsName');


let newLog; //A variable which will later be used as an object for temporary data stroage before movement to an array

let totalHoursDriven = 0; //A variable which holds the totale hours driven
let progressionPercentage = 0;//Calculating the percentage


logRef.once('value').then(reload); //Getting data from onlne firebase databse and once information is recieved calls a function
instIDRef.once('value').then(loopThroughInstructors);//Getting data from onlne firebase databse and once information is recieved calls a function


/** This function is used for once the data is recieved from the online database, it then loops through the arrays and 
 * adds all the data into the table
 * Parameters:
 *  data(array) - the data that is being recived
 * Return - None */
function reload(data) {
  if (logbookArray == null) logbookArray = []; //If there is no data in the online databse, it creates an array
  logbookArray = data.val();//Adding the incoming data into a object

  document.getElementById('tbody').innerHTML = ''; //Accesing the logBook
  var testRow = document.getElementById('tbody').insertRow(0);//Adding row to the table
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
    calculateStats();//Function to calculate statistics
  }

}





goToPage(mainPage);//Calls code to change page at beginning of program


/** This function is used to record the page which has been used to navigate to the instricturs oage, so page
 * so that when the user goes out of the page, it will take him to the last page he was at
 * Parameter:
 *  mainPage(pageWanted) - The page that the user was previously on
 * Returns null
  */
function pageFromInstructorPage(pageWanted) {

  pageFromInstructor = pageWanted;//Setting the variable


}





/** This function is used to hide all the different pages and then shows a single page based on the parameter
 Parameters: 
   pagenumber(string) - Allows the choice of choosing what page to show
 Return: 
   Returns null */

function goToPage(pageNumber) {

  document.querySelectorAll('.pages').forEach((e) => e.hidden = true); //hides all pages with a class of pages
  pageNumber.hidden = false;//shows page needed

}


/** This function adds a new instructor to the array, whenever the user adds a new instructor
 * Parameters: none
 * Return-None
 */
function addNewInstructor() { //Adds the inputted instructors into an array for later user.


  if (instructorIdArray == null) instructorIdArray = []; //Testing to see if the online dtabase is empty and if so just create an empty array

  instructorIdArray.push(document.getElementById('instructorId').value);//pushing the inputs into the arrays

  document.getElementById('instructors');

  var opt = instructorIdArray[instructorIdArray.length - 1]; //Creating an option based off of the latest option in the instructor array
  var el = document.createElement("option");//Creating an optio element
  el.textContent = opt;//Making that element have the data from the option
  el.value = opt;//Making the value have the data from the option
  document.getElementById('instructors').appendChild(el); //Adding the element to the select input

  var optQuery = instructorIdArray[instructorIdArray.length - 1]; //Creating an option based off of the latest option in the instructor array
  var elQuery = document.createElement("option");//Creating an optio element
  elQuery.textContent = opt;//Making that element have the data from the option
  elQuery.value = opt;//Making the value have the data from the option
  document.getElementById('instructorsQuery').appendChild(elQuery); //Adding the element to the select input

  goToPage(pageFromInstructor); //Going back to he prevoius page
  instIDRef.update(instructorIdArray);//Updating the online databse

  document.getElementById("instructorId").value = ""; //Clearing the input field

}


/** This function is called once the data is recieved from an online database and is called to input the recieved data 
 * into the selct input bar
 * 
 * Parameters: 
 * data(array) - the data that is being recieved
 * 
 * Return: none
 */

function loopThroughInstructors(data) {

  instructorIdArray = data.val(); //Setting the data to a variable
  document.getElementById('instructors').innerHTML = "";

  for (var i = 0; i < instructorIdArray.length; i++) { //Looping through the array with the set data

    var opt = instructorIdArray[i]; //Setting an option with the value of the array
    var optQuery = instructorIdArray[i];

    var el = document.createElement("option"); //Creating an option for the select bar
    var elQuery = document.createElement("option");

    el.textContent = opt; //Setting the element with the option text
    elQuery.textContent = optQuery;

    el.value = opt;
    elQuery.value = optQuery;

    document.getElementById('instructors').appendChild(el); //Adding the element to the select option
    document.getElementById('instructorsQuery').appendChild(elQuery);

  }

}

/** Function used to check is all the inputted data is formatted correctly and is valid
 * 
 * Parmaters: None
 * Return: None
*/

function checkCorrectPage() { //Checking if all formatting is corrct and correct data

  if (document.getElementById('Date').value === "") { //Checking if fields are empty

    alert("Please enter date"); //If it is empty then state this alert
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

    alert("Please enter traffic conditions");
  }
  else if (document.getElementById('TimeStart').value === "") {

    alert("Please enter starting time");
  }
  else if (document.getElementById('TimeFinish').value === "") {

    alert("Please enter finishing time");
  }
  else if (document.getElementById('instructors').value === "") {

    alert("Please enter instructor ID");

  }
  else if (document.getElementById('LicenseNumber').value === "") {

    alert("Please enter license number");

  }
  else if (document.getElementById('HoursDay').value != "" || document.getElementById('HoursDay').value != "") {

    addNewRow(); //After checking is correct, a new row is added

  }

  else {
    alert("Please enter hours driven");

  }
}

/**Function used to delete a row and remove it from the array
 * Paramerters:
 * rowNumber(number) - the row that is being deleted
 */
function deleteRow(rowNumber) { //Deleteing element from an array and updating the table

  if (confirm('Are you sure you want to remove from database')) { //A popup stating if the user really wants to delete the row
    logbookArray.splice(rowNumber, 1); //Taking out of array
    logRef.set(logbookArray);//Updating online database



    document.getElementById('tbody').innerHTML = ''; //Accesing the logBook

    var queryNewRow = document.getElementById('tbody').insertRow(0);
    queryNewRow.classList.add("w3-light-grey");
    calculateStats();
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

}

/**Function called multiple times to fill in all the cells of the logbook
 * Paramaters:
 * currentRow(number) - the current row that is being filled in
 * 
 * Return: none
 */

function fillCells(currentRow) {

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

  deleteCell.innerHTML = "<i class='fas fa-trash-alt w3-button w3-round-xlarge' onclick='deleteRow(" + currentRow + ")'></i>" //Adding in a button which calls the function to delete a row and takes a parameter of the appropiate row

}

/**Function called to search for particular values of the array 
 * Parameters: None
 * Return: None
*/
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
    deleteCell.innerHTML = "<i class='fas fa-trash-alt w3-button w3-round-xlarge' onclick='deleteRow(" + i + ")'></i>"//adding a delete button which takes the current row as the paremeter
    if (document.getElementById("DateQuery").value != "") {//Checking if input is empty

      if (logbookArray[i].date === document.getElementById("DateQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);//If true the cells are then filled for that row

      }

    }
    else if (document.getElementById("OdometerStartQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].odomArrayStart === document.getElementById("OdometerStartQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);//If true the cells are then filled for that row

      }

    }
    else if (document.getElementById("OdometerFinishQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].odomArrayFinish === document.getElementById("OdometerFinishQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);//If true the cells are then filled for that row

      }

    }
    else if (document.getElementById("TimeStartQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].startTimeArray === document.getElementById("TimeStartQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);//If true the cells are then filled for that row

      }

    }
    else if (document.getElementById("TimeFinishQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].finsishTimeArray === document.getElementById("TimeFinishQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);//If true the cells are then filled for that row

      }

    }
    else if (document.getElementById("instructorsQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].instructorArrayValue === document.getElementById("instructorsQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);//If true the cells are then filled for that row

      }

    }
    else if (document.getElementById("LicenseNumberQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].license === document.getElementById("LicenseNumberQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);//If true the cells are then filled for that row

      }

    }
    else if (document.getElementById("HoursDayQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].hoursDrivenArray === document.getElementById("HoursDayQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);//If true the cells are then filled for that row

      }

    }
    else if (document.getElementById("HoursNightQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].hoursDrivenNightArray === document.getElementById("HoursNightQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);//If true the cells are then filled for that row

      }

    }
    else if (document.getElementById("weatherQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].weather === document.getElementById("weatherQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);//If true the cells are then filled for that row

      }

    }
    else if (document.getElementById("roadConditionQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].road === document.getElementById("roadConditionQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);//If true the cells are then filled for that row

      }

    }
    else if (document.getElementById("trafficQuery").value != "") {//Checking if input is empty


      if (logbookArray[i].traffic === document.getElementById("trafficQuery").value) {//Checking if the current row is equal to the inputed query search

        fillCells(i);//If true the cells are then filled for that row

      }

    }
    else {
      fillCells(i);//If true the cells are then filled for that row


    }
  }
  goToPage(logbookPage); //Going to the logbook

  document.getElementById('DateQuery').value = ""; //clearing the data in the input form for later use
  document.getElementById('OdometerStartQuery').value = "";
  document.getElementById('OdometerFinishQuery').value = "";
  document.getElementById('roadConditionQuery').value = "";
  document.getElementById('trafficQuery').value = "";
  document.getElementById('TimeStartQuery').value = "";
  document.getElementById('TimeFinishQuery').value = "";
  document.getElementById('instructorsQuery').value = "";
  document.getElementById('LicenseNumberQuery').value = "";
  document.getElementById('HoursDayQuery').value = "";
  document.getElementById('HoursNightQuery').value = "";




}


/**Function used to add a new field into the logbook
 * Paramerters;None
 * Return:None
 */
function addNewRow() { //Adding in a new row
  document.getElementById('tbody').innerHTML = ''; //Clearing table

  var queryNewRow = document.getElementById('tbody').insertRow(0);
  queryNewRow.classList.add("w3-light-grey");
  if (logbookArray == null) logbookArray = []; //Checking if the array is empty and if so create an array

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
    hoursDrivenNightArray: document.getElementById('HoursNight').value,
    i: logbookArray.length
  }

  logbookArray.push(newLog);//Adding the object into an array

  logRef.update(logbookArray); //Updating the online database

  for (i = 0; i < logbookArray.length; i++) {//Looping through all values in array

    var LogTable = document.getElementById("logbook"); //Referencing the logbook table
    var row = LogTable.insertRow(LogTable.rows.length);//Creating a row in that logbook table
    dateCell = row.insertCell(0); //Inserting cells into the row of that table
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


  calculateStats();//Calculates the different statistics such as percentage

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

/**Function used to calculate the statistics
 * Parameters:None
 * Return:None
 */
function calculateStats() {

  totalHoursDriven = 0; //Reseting the totalhours driven

  for (a = 0; a < logbookArray.length; a++) { //Looping through the logbook array and adding the respective data from every row

    totalHoursDriven = Number(logbookArray[a].hoursDrivenArray) + Number(logbookArray[a].hoursDrivenNightArray) + totalHoursDriven; //Adding the data for total hours driven

  }
  //test
  progressionPercentage = (totalHoursDriven / 120) * 100; //Calculatting the percentage driven of the total hours
  document.getElementById('progression').style.width = progressionPercentage + "%";
  document.getElementById('progression').innerHTML = Math.round(progressionPercentage) + "%";
  document.getElementById('currentHours').innerHTML = totalHoursDriven;


  if (totalHoursDriven === 0) {
    console.log("less than 0")
    document.getElementById('progression').hidden = true;

  } else {

    document.getElementById('progression').hidden = false;
    console.log("more than 0")
  }
  // totalHoursDriven += Number(document.getElementById('HoursDay').value) + Number(document.getElementById('HoursNight').value);
  // document.getElementById('currentHours').innerHTML = totalHoursDriven;



  ;



}



