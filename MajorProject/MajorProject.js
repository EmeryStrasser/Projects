//variables
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

let instructorArray = [];
let logbookArray = [];

let newLog;

let totalHoursDriven = 0;
let progressionPercentage = 0;

goToPage(mainPage);//Calls code to change page at beginning of program

function goToPage(pageNumber) { //Basic code to be called when changing pages

  document.querySelectorAll('.pages').forEach((e) => e.hidden = true); //hides all pages
  pageNumber.hidden = false;//shows page needed

}

function addNewInstructor() {


  instructorArray.push(document.getElementById('instructorId').value);

  document.getElementById('instructors');


  for (var i = 0; i < instructorArray.length; i++) {
    var opt = instructorArray[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    document.getElementById('instructors').appendChild(el);
  }

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
    addNewRow();


  }

  else {
    alert("Please enter hours driven");


  }
}

function querySearch() {

  document.getElementById('tbody').innerHTML = '';

  var queryNewRow = document.getElementById('tbody').insertRow(0);
  queryNewRow.classList.add("w3-grey");

  for (i = 0; i < logbookArray.length; i++) {

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


    if (document.getElementById("DateQuery").value != "") {

      if (logbookArray[i].date === document.getElementById("DateQuery").value) {

        dateCell.innerHTML = logbookArray[i].date;
        odomStartCell.innerHTML = logbookArray[i].odomArrayStart;
        odomFinCell.innerHTML = logbookArray[i].odomArrayFinish;
        weatherCondCell.innerHTML = logbookArray[i].weather;
        roadCondCell.innerHTML = logbookArray[i].road;
        trafficCondCell.innerHTML = logbookArray[i].traffic;
        startTimeCell.innerHTML = logbookArray[i].startTimeArray;
        finishTimeCell.innerHTML = logbookArray[i].finsishTimeArray;
        instructorIdCell.innerHTML = logbookArray[i].instructorArrayValue;
        licenseNumCell.innerHTML = logbookArray[i].license;
        hoursDrivenDayCell.innerHTML = logbookArray[i].hoursDrivenArray;
        hoursDrivenNightCell.innerHTML = logbookArray[i].hoursDrivenNightArray;

      }

    }
    else if (document.getElementById("OdometerStartQuery").value != "") {


      if (logbookArray[i].odomArrayStart === document.getElementById("OdometerStartQuery").value) {

        dateCell.innerHTML = logbookArray[i].date;
        odomStartCell.innerHTML = logbookArray[i].odomArrayStart;
        odomFinCell.innerHTML = logbookArray[i].odomArrayFinish;
        weatherCondCell.innerHTML = logbookArray[i].weather;
        roadCondCell.innerHTML = logbookArray[i].road;
        trafficCondCell.innerHTML = logbookArray[i].traffic;
        startTimeCell.innerHTML = logbookArray[i].startTimeArray;
        finishTimeCell.innerHTML = logbookArray[i].finsishTimeArray;
        instructorIdCell.innerHTML = logbookArray[i].instructorArrayValue;
        licenseNumCell.innerHTML = logbookArray[i].license;
        hoursDrivenDayCell.innerHTML = logbookArray[i].hoursDrivenArray;
        hoursDrivenNightCell.innerHTML = logbookArray[i].hoursDrivenNightArray;

      }

    }
    else if (document.getElementById("OdometerFinishQuery").value != "") {


      if (logbookArray[i].odomArrayFinish === document.getElementById("OdometerFinishQuery").value) {

        dateCell.innerHTML = logbookArray[i].date;
        odomStartCell.innerHTML = logbookArray[i].odomArrayStart;
        odomFinCell.innerHTML = logbookArray[i].odomArrayFinish;
        weatherCondCell.innerHTML = logbookArray[i].weather;
        roadCondCell.innerHTML = logbookArray[i].road;
        trafficCondCell.innerHTML = logbookArray[i].traffic;
        startTimeCell.innerHTML = logbookArray[i].startTimeArray;
        finishTimeCell.innerHTML = logbookArray[i].finsishTimeArray;
        instructorIdCell.innerHTML = logbookArray[i].instructorArrayValue;
        licenseNumCell.innerHTML = logbookArray[i].license;
        hoursDrivenDayCell.innerHTML = logbookArray[i].hoursDrivenArray;
        hoursDrivenNightCell.innerHTML = logbookArray[i].hoursDrivenNightArray;

      }

    }
    else if (document.getElementById("TimeStartQuery").value != "") {


      if (logbookArray[i].startTimeArray === document.getElementById("TimeStartQuery").value) {

        dateCell.innerHTML = logbookArray[i].date;
        odomStartCell.innerHTML = logbookArray[i].odomArrayStart;
        odomFinCell.innerHTML = logbookArray[i].odomArrayFinish;
        weatherCondCell.innerHTML = logbookArray[i].weather;
        roadCondCell.innerHTML = logbookArray[i].road;
        trafficCondCell.innerHTML = logbookArray[i].traffic;
        startTimeCell.innerHTML = logbookArray[i].startTimeArray;
        finishTimeCell.innerHTML = logbookArray[i].finsishTimeArray;
        instructorIdCell.innerHTML = logbookArray[i].instructorArrayValue;
        licenseNumCell.innerHTML = logbookArray[i].license;
        hoursDrivenDayCell.innerHTML = logbookArray[i].hoursDrivenArray;
        hoursDrivenNightCell.innerHTML = logbookArray[i].hoursDrivenNightArray;

      }

    }
    else if (document.getElementById("TimeFinishQuery").value != "") {


      if (logbookArray[i].finsishTimeArray === document.getElementById("TimeFinishQuery").value) {

        dateCell.innerHTML = logbookArray[i].date;
        odomStartCell.innerHTML = logbookArray[i].odomArrayStart;
        odomFinCell.innerHTML = logbookArray[i].odomArrayFinish;
        weatherCondCell.innerHTML = logbookArray[i].weather;
        roadCondCell.innerHTML = logbookArray[i].road;
        trafficCondCell.innerHTML = logbookArray[i].traffic;
        startTimeCell.innerHTML = logbookArray[i].startTimeArray;
        finishTimeCell.innerHTML = logbookArray[i].finsishTimeArray;
        instructorIdCell.innerHTML = logbookArray[i].instructorArrayValue;
        licenseNumCell.innerHTML = logbookArray[i].license;
        hoursDrivenDayCell.innerHTML = logbookArray[i].hoursDrivenArray;
        hoursDrivenNightCell.innerHTML = logbookArray[i].hoursDrivenNightArray;

      }

    }
    else if (document.getElementById("instructorsQuery").value != "") {


      if (logbookArray[i].instructorArray === document.getElementById("instructorsQuery").value) {

        dateCell.innerHTML = logbookArray[i].date;
        odomStartCell.innerHTML = logbookArray[i].odomArrayStart;
        odomFinCell.innerHTML = logbookArray[i].odomArrayFinish;
        weatherCondCell.innerHTML = logbookArray[i].weather;
        roadCondCell.innerHTML = logbookArray[i].road;
        trafficCondCell.innerHTML = logbookArray[i].traffic;
        startTimeCell.innerHTML = logbookArray[i].startTimeArray;
        finishTimeCell.innerHTML = logbookArray[i].finsishTimeArray;
        instructorIdCell.innerHTML = logbookArray[i].instructorArrayValue;
        licenseNumCell.innerHTML = logbookArray[i].license;
        hoursDrivenDayCell.innerHTML = logbookArray[i].hoursDrivenArray;
        hoursDrivenNightCell.innerHTML = logbookArray[i].hoursDrivenNightArray;

      }

    }
    else if (document.getElementById("LicenseNumberQuery").value != "") {


      if (logbookArray[i].license === document.getElementById("LicenseNumberQuery").value) {

        dateCell.innerHTML = logbookArray[i].date;
        odomStartCell.innerHTML = logbookArray[i].odomArrayStart;
        odomFinCell.innerHTML = logbookArray[i].odomArrayFinish;
        weatherCondCell.innerHTML = logbookArray[i].weather;
        roadCondCell.innerHTML = logbookArray[i].road;
        trafficCondCell.innerHTML = logbookArray[i].traffic;
        startTimeCell.innerHTML = logbookArray[i].startTimeArray;
        finishTimeCell.innerHTML = logbookArray[i].finsishTimeArray;
        instructorIdCell.innerHTML = logbookArray[i].instructorArrayValue;
        licenseNumCell.innerHTML = logbookArray[i].license;
        hoursDrivenDayCell.innerHTML = logbookArray[i].hoursDrivenArray;
        hoursDrivenNightCell.innerHTML = logbookArray[i].hoursDrivenNightArray;

      }

    }
    else if (document.getElementById("HoursDayQuery").value != "") {


      if (logbookArray[i].hoursDrivenArray === document.getElementById("HoursDayQuery").value) {

        dateCell.innerHTML = logbookArray[i].date;
        odomStartCell.innerHTML = logbookArray[i].odomArrayStart;
        odomFinCell.innerHTML = logbookArray[i].odomArrayFinish;
        weatherCondCell.innerHTML = logbookArray[i].weather;
        roadCondCell.innerHTML = logbookArray[i].road;
        trafficCondCell.innerHTML = logbookArray[i].traffic;
        startTimeCell.innerHTML = logbookArray[i].startTimeArray;
        finishTimeCell.innerHTML = logbookArray[i].finsishTimeArray;
        instructorIdCell.innerHTML = logbookArray[i].instructorArrayValue;
        licenseNumCell.innerHTML = logbookArray[i].license;
        hoursDrivenDayCell.innerHTML = logbookArray[i].hoursDrivenArray;
        hoursDrivenNightCell.innerHTML = logbookArray[i].hoursDrivenNightArray;

      }

    }
    else if (document.getElementById("HoursNightQuery").value != "") {


      if (logbookArray[i].hoursDrivenNightArray === document.getElementById("HoursNightQuery").value) {

        dateCell.innerHTML = logbookArray[i].date;
        odomStartCell.innerHTML = logbookArray[i].odomArrayStart;
        odomFinCell.innerHTML = logbookArray[i].odomArrayFinish;
        weatherCondCell.innerHTML = logbookArray[i].weather;
        roadCondCell.innerHTML = logbookArray[i].road;
        trafficCondCell.innerHTML = logbookArray[i].traffic;
        startTimeCell.innerHTML = logbookArray[i].startTimeArray;
        finishTimeCell.innerHTML = logbookArray[i].finsishTimeArray;
        instructorIdCell.innerHTML = logbookArray[i].instructorArrayValue;
        licenseNumCell.innerHTML = logbookArray[i].license;
        hoursDrivenDayCell.innerHTML = logbookArray[i].hoursDrivenArray;
        hoursDrivenNightCell.innerHTML = logbookArray[i].hoursDrivenNightArray;

      }

    }
    else if (document.getElementById("weatherQuery").value != "") {


      if (logbookArray[i].weather === document.getElementById("weatherQuery").value) {

        dateCell.innerHTML = logbookArray[i].date;
        odomStartCell.innerHTML = logbookArray[i].odomArrayStart;
        odomFinCell.innerHTML = logbookArray[i].odomArrayFinish;
        weatherCondCell.innerHTML = logbookArray[i].weather;
        roadCondCell.innerHTML = logbookArray[i].road;
        trafficCondCell.innerHTML = logbookArray[i].traffic;
        startTimeCell.innerHTML = logbookArray[i].startTimeArray;
        finishTimeCell.innerHTML = logbookArray[i].finsishTimeArray;
        instructorIdCell.innerHTML = logbookArray[i].instructorArrayValue;
        licenseNumCell.innerHTML = logbookArray[i].license;
        hoursDrivenDayCell.innerHTML = logbookArray[i].hoursDrivenArray;
        hoursDrivenNightCell.innerHTML = logbookArray[i].hoursDrivenNightArray;

      }

    }
    else if (document.getElementById("roadConditionQuery").value != "") {


      if (logbookArray[i].road === document.getElementById("roadConditionQuery").value) {

        dateCell.innerHTML = logbookArray[i].date;
        odomStartCell.innerHTML = logbookArray[i].odomArrayStart;
        odomFinCell.innerHTML = logbookArray[i].odomArrayFinish;
        weatherCondCell.innerHTML = logbookArray[i].weather;
        roadCondCell.innerHTML = logbookArray[i].road;
        trafficCondCell.innerHTML = logbookArray[i].traffic;
        startTimeCell.innerHTML = logbookArray[i].startTimeArray;
        finishTimeCell.innerHTML = logbookArray[i].finsishTimeArray;
        instructorIdCell.innerHTML = logbookArray[i].instructorArrayValue;
        licenseNumCell.innerHTML = logbookArray[i].license;
        hoursDrivenDayCell.innerHTML = logbookArray[i].hoursDrivenArray;
        hoursDrivenNightCell.innerHTML = logbookArray[i].hoursDrivenNightArray;

      }

    }
    else if (document.getElementById("trafficQuery").value != "") {


      if (logbookArray[i].traffic === document.getElementById("trafficQuery").value) {

        dateCell.innerHTML = logbookArray[i].date;
        odomStartCell.innerHTML = logbookArray[i].odomArrayStart;
        odomFinCell.innerHTML = logbookArray[i].odomArrayFinish;
        weatherCondCell.innerHTML = logbookArray[i].weather;
        roadCondCell.innerHTML = logbookArray[i].road;
        trafficCondCell.innerHTML = logbookArray[i].traffic;
        startTimeCell.innerHTML = logbookArray[i].startTimeArray;
        finishTimeCell.innerHTML = logbookArray[i].finsishTimeArray;
        instructorIdCell.innerHTML = logbookArray[i].instructorArrayValue;
        licenseNumCell.innerHTML = logbookArray[i].license;
        hoursDrivenDayCell.innerHTML = logbookArray[i].hoursDrivenArray;
        hoursDrivenNightCell.innerHTML = logbookArray[i].hoursDrivenNightArray;

      }

    }
    else {
      dateCell.innerHTML = logbookArray[i].date;
      odomStartCell.innerHTML = logbookArray[i].odomArrayStart;
      odomFinCell.innerHTML = logbookArray[i].odomArrayFinish;
      weatherCondCell.innerHTML = logbookArray[i].weather;
      roadCondCell.innerHTML = logbookArray[i].road;
      trafficCondCell.innerHTML = logbookArray[i].traffic;
      startTimeCell.innerHTML = logbookArray[i].startTimeArray;
      finishTimeCell.innerHTML = logbookArray[i].finsishTimeArray;
      instructorIdCell.innerHTML = logbookArray[i].instructorArrayValue;
      licenseNumCell.innerHTML = logbookArray[i].license;
      hoursDrivenDayCell.innerHTML = logbookArray[i].hoursDrivenArray;
      hoursDrivenNightCell.innerHTML = logbookArray[i].hoursDrivenNightArray;


    }
  }
  goToPage(logbookPage);

}

function addNewRow() {
  document.getElementById('tbody').innerHTML = '';

  var queryNewRow = document.getElementById('tbody').insertRow(0);
  queryNewRow.classList.add("w3-grey");


  newLog = {
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
  logbookArray.push(newLog);
  console.log(logbookArray[logbookArray.length - 1]);

  for (i = 0; i < logbookArray.length; i++) {

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

    dateCell.innerHTML = logbookArray[i].date;
    odomStartCell.innerHTML = logbookArray[i].odomArrayStart;
    odomFinCell.innerHTML = logbookArray[i].odomArrayFinish;
    weatherCondCell.innerHTML = logbookArray[i].weather;
    roadCondCell.innerHTML = logbookArray[i].road;
    trafficCondCell.innerHTML = logbookArray[i].traffic;
    startTimeCell.innerHTML = logbookArray[i].startTimeArray;
    finishTimeCell.innerHTML = logbookArray[i].finsishTimeArray;
    instructorIdCell.innerHTML = logbookArray[i].instructorArrayValue;
    licenseNumCell.innerHTML = logbookArray[i].license;
    hoursDrivenDayCell.innerHTML = logbookArray[i].hoursDrivenArray;
    hoursDrivenNightCell.innerHTML = logbookArray[i].hoursDrivenNightArray;





  }





  calculateStats();

  document.getElementById('Date').value = "";
  document.getElementById('OdometerStart').value = "";
  document.getElementById('OdometerFinish').value = "";
  document.getElementById('weather').value = "";
  document.getElementById('roadCondition').value = "";
  document.getElementById('traffic').value = "";
  document.getElementById('TimeStart').value = "";
  document.getElementById('TimeFinish').value = "";
  document.getElementById('instructors').value = "";
  document.getElementById('LicenseNumber').value = "";
  document.getElementById('HoursDay').value = "";
  document.getElementById('HoursNight').value = "";

  goToPage(logbookPage);

}

function calculateStats() {

  totalHoursDriven += Number(document.getElementById('HoursDay').value) + Number(document.getElementById('HoursNight').value);
  document.getElementById('currentHours').innerHTML = totalHoursDriven;

  progressionPercentage = (totalHoursDriven / 120) * 100;
  console.log(progressionPercentage);
  document.getElementById('progression').style.width = progressionPercentage + "%";

}



