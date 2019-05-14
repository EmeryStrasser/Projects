
let usernamePasswordArray = [];
let quizArray = [];

let database = firebase.database();

let UsernamePasswordRef = database.ref('/UsernamePassword');
let quizRef = database.ref('/quizDB');


let quizName;
let quizDescription;
let timeLimit;

let questionArray = [];

let username;

let questionNumber;


let quizNumberCell;
let quiznameCell;
let quizDescCell;
let quizRatingCell;
let authorCell;

// let quizArray = [[Quiz Name, Quiz Description, Time limit, [quiz ID, [Question, [Answer1, Correct/Wrong],[Answer2, Correct/Wrong],[Answer3, Correct/Wrong],[Answer4, Correct/Wrong]]]]]


UsernamePasswordRef.once('value').then(reload);
quizRef.once('value').then(reloadQuiz);

function reload(data) {
  if (usernamePasswordArray == null) usernamePasswordArray = []; //If there is no data in the online databse, it creates an array

  usernamePasswordArray = data.val();//Adding the incoming data into a object
  console.log(usernamePasswordArray);


  // UsernamePasswordRef.update(usernamePasswordArray);

}

function reloadQuiz(data) {
  //If there is no data in the online databse, it creates an array
  if (quizArray == null) quizArray = [];
  quizArray = data.val();//Adding the incoming data into a object
  console.log(quizArray);

  // quizArray = [["test", "test"]];
  // quizRef.update(quizArray);
  // quizArray = ["test"];
  document.getElementById('tbody').innerHTML = ''; //Accesing the logBook
  var testRow = document.getElementById('tbody').insertRow(0);//Adding row to the table


  for (i = 0; i < quizArray.length; i++) { //Looping throught the array

    var quizTable = document.getElementById("quizTable"); //Accesing logbooks
    var row = quizTable.insertRow(quizTable.rows.length);//Inserting a new row
    quizNumberCell = row.insertCell(0); //Inserting the different cells 
    quiznameCell = row.insertCell(1);
    quizDescCell = row.insertCell(2);
    quizRatingCell = row.insertCell(3);
    authorCell = row.insertCell(4);


    fillCells(i); //calling function to fill the cells with appropiate data, takes parameter of the array index.
    // calculateStats();//Function to calculate statistics
  }
}


function Login() {

  let UserCheck = document.getElementById("loginUsername").value;

  let passwordCheck = document.getElementById("loginPassword").value;
  for (i = 0; i < usernamePasswordArray.length; i++) {
    // let temporaryArray = [];
    // temporaryArray = usernamePasswordArray[i];

    if (UserCheck === usernamePasswordArray[i][0]) {

      console.log("FoundUsername");

      if (passwordCheck === usernamePasswordArray[i][1]) {

        console.log("passwordFound")
        username = UserCheck;
        goToPage(quizPage);
        return;
      }

    }

  }

  alert("no matches found")
}

function NewMember() {

  let UserCheck = document.getElementById("newUsername").value;
  let passwordCheck = document.getElementById("newPassword").value;

  for (i = 0; i < usernamePasswordArray.length; i++) {

    // let temporaryArray = [];
    // temporaryArray = usernamePasswordArray[i];

    if (UserCheck === usernamePasswordArray[i][0]) {

      alert("Username is already being used");

      return;
    }
    else if (UserCheck.toString().includes(" ")) {

      alert("Pleas remove spaces from username");


      return;
    }

  }

  console.log("can use this");

  usernamePasswordArray.push([UserCheck, passwordCheck]);
  UsernamePasswordRef.update(usernamePasswordArray);

  goToPage(quizPage);

}


function quizCreation() {
  console.log("test");
  quizName = document.getElementById("quizName").value;
  console.log(quizName);
  quizDescription = document.getElementById("quizDescription").value;
  console.log(quizDescription);
  timeLimit = document.getElementById("timeLimit").value;
  console.log(timeLimit);
  questionNumber = 1;
  document.getElementById("questionNumber").innerHTML = questionNumber;


}

function questionCreation() {
  questionNumber++;

  document.getElementById("questionNumber").innerHTML = questionNumber;


  let question = document.getElementById("quizQuestion").value;
  let answer1 = document.getElementById("answer1").value;
  let answer2 = document.getElementById("answer2").value;
  let answer3 = document.getElementById("answer3").value;
  let answer4 = document.getElementById("answer4").value;

  let checkbox1 = document.getElementById("Answer1Correct").checked;
  let checkbox2 = document.getElementById("Answer2Correct").checked;
  let checkbox3 = document.getElementById("Answer3Correct").checked;
  let checkbox4 = document.getElementById("Answer4Correct").checked;

  questionArray.push([question, [answer1, checkbox1], [answer2, checkbox2], [answer3, checkbox3], [answer4, checkbox4]]);

  document.getElementById("quizQuestion").value = "";
  document.getElementById("answer1").value = "";
  document.getElementById("answer2").value = "";
  document.getElementById("answer3").value = "";
  document.getElementById("answer4").value = "";
  document.getElementById("Answer1Correct").checked = false;
  document.getElementById("Answer2Correct").checked = false;
  document.getElementById("Answer3Correct").checked = false;
  document.getElementById("Answer4Correct").checked = false;

}


function finishQuizCreation() {

  let question = document.getElementById("quizQuestion").value;
  let answer1 = document.getElementById("answer1").value;
  let answer2 = document.getElementById("answer2").value;
  let answer3 = document.getElementById("answer3").value;
  let answer4 = document.getElementById("answer4").value;

  let checkbox1 = document.getElementById("Answer1Correct").checked;
  let checkbox2 = document.getElementById("Answer2Correct").checked;
  let checkbox3 = document.getElementById("Answer3Correct").checked;
  let checkbox4 = document.getElementById("Answer4Correct").checked;

  questionArray.push([question, [answer1, checkbox1], [answer2, checkbox2], [answer3, checkbox3], [answer4, checkbox4]]);

  document.getElementById("quizQuestion").value = "";
  document.getElementById("answer1").value = "";
  document.getElementById("answer2").value = "";
  document.getElementById("answer3").value = "";
  document.getElementById("answer4").value = "";
  document.getElementById("Answer1Correct").checked = false;
  document.getElementById("Answer2Correct").checked = false;
  document.getElementById("Answer3Correct").checked = false;
  document.getElementById("Answer4Correct").checked = false;

  console.log(quizArray);
  // quizArray.push("test");
  quizArray.push([quizName, quizDescription, timeLimit, username, questionArray]);

  questionArray = [];

  quizRef.update(quizArray);


  document.getElementById('tbody').innerHTML = ''; //Accesing the logBook
  var testRow = document.getElementById('tbody').insertRow(0);//Adding row to the table


  for (i = 0; i < quizArray.length; i++) { //Looping throught the array

    var quizTable = document.getElementById("quizTable"); //Accesing logbooks
    var row = quizTable.insertRow(quizTable.rows.length);//Inserting a new row
    quizNumberCell = row.insertCell(0); //Inserting the different cells 
    quiznameCell = row.insertCell(1);
    quizDescCell = row.insertCell(2);
    quizRatingCell = row.insertCell(3);
    authorCell = row.insertCell(4);


    fillCells(i); //calling function to fill the cells with appropiate data, takes parameter of the array index.
    // calculateStats();//Function to calculate statistics
  }

  goToPage(quizPage);

  console.log(quizArray);

}



function fillCells(currentRow) {

  quizNumberCell.innerHTML = "<i class='fas fa-play w3-button w3-xxlarge w3-round-xlarge' onclick='deleteRow(" + currentRow + ")'></i>"
  //Accesing the cell and filling in the cell with values from the array and the objects
  console.log(quizArray[currentRow][0]);
  quiznameCell.innerHTML = quizArray[currentRow][0];
  quizDescCell.innerHTML = quizArray[currentRow][1];
  quizRatingCell.innerHTML = "";
  authorCell.innerHTML = quizArray[currentRow][3];


}






//UsernamePasswordRef.update(usernamePasswordArray);

/** This function is used to hide all the different pages and then shows a single page based on the parameter
 Parameters: 
   pagenumber(string) - Allows the choice of choosing what page to show
 Return: 
   Returns null */

goToPage(mainPage);//Calls code to change page at beginning of program

function goToPage(pageNumber) {

  document.querySelectorAll('.pages').forEach((e) => e.hidden = true); //hides all pages with a class of pages
  pageNumber.hidden = false;//shows page needed


  document.getElementById("newUsername").value = "";
  document.getElementById("newPassword").value = "";
  document.getElementById("loginUsername").value = "";
  document.getElementById("loginPassword").value = "";
  document.getElementById("quizName").value = "";
  document.getElementById("quizDescription").value = "";
  document.getElementById("timeLimit").value = "";



}



