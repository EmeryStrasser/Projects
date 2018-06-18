
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

goToPage(page1);

function goToPage(pageNumber) {

  document.querySelectorAll('.pages').forEach((e) => e.hidden = true);
  pageNumber.hidden = false;

}



function checkCorrectPage() {

  if (document.getElementById('Date').value === "") {

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

    alert("Please enter traffic conditions");
  }
  else if (document.getElementById('TimeStart').value === "") {

    alert("Please enter starting time");
  }
  else if (document.getElementById('TimeFinish').value === "") {

    alert("Please enter finishing time");
  }
  else if (document.getElementById('InstuctorId').value === "") {

    alert("Please enter instructor ID");

  }
  else if (document.getElementById('LicenseNumber').value === "") {

    alert("Please enter license number");

  }
  else if (document.getElementById('HoursDay').value != "" || document.getElementById('HoursDay').value != "") {

    addNewRow();


  }

  else {
    alert("Please enter hours driven");


  }





}



function addNewRow() {
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

  dateCell.innerHTML = document.getElementById('Date').value;
  odomStartCell.innerHTML = document.getElementById('OdometerStart').value;
  odomFinCell.innerHTML = document.getElementById('OdometerFinish').value;
  weatherCondCell.innerHTML = document.getElementById('weather').value;
  roadCondCell.innerHTML = document.getElementById('roadCondition').value;
  trafficCondCell.innerHTML = document.getElementById('traffic').value;
  startTimeCell.innerHTML = document.getElementById('TimeStart').value;
  finishTimeCell.innerHTML = document.getElementById('TimeFinish').value;
  instructorIdCell.innerHTML = document.getElementById('InstuctorId').value;
  licenseNumCell.innerHTML = document.getElementById('LicenseNumber').value;
  hoursDrivenDayCell.innerHTML = document.getElementById('HoursDay').value;
  hoursDrivenNightCell.innerHTML = document.getElementById('HoursNight').value;

  document.getElementById('Date').value = "";
  document.getElementById('OdometerStart').value = "";
  document.getElementById('OdometerFinish').value = "";
  document.getElementById('weather').value = "";
  document.getElementById('roadCondition').value = "";
  document.getElementById('traffic').value = "";
  document.getElementById('TimeStart').value = "";
  document.getElementById('TimeFinish').value = "";
  document.getElementById('InstuctorId').value = "";
  document.getElementById('LicenseNumber').value = "";
  document.getElementById('HoursDay').value = "";
  document.getElementById('HoursNight').value = "";

  goToPage(page1);

}



