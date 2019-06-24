
let usernamePasswordArray = [];
let quizArray = [];

let database = firebase.database();

let UsernamePasswordRef = database.ref('/UsernamePassword');
let quizRef = database.ref('/quizDB');

let defaultSort = "alphabetical";

let quizName;
let quizDescription;


let questionArray = [];

let username;

let questionNumber;


let quizNumberCell;
let quiznameCell;
let quizDescCell;
let quizRatingCell;
let authorCell;

let currentQuestion;
let lastQuizId;
let questionCounter = 0;

let score;

let isSearchingBool = false;

UsernamePasswordRef.once('value').then(reload);
quizRef.once('value').then(reloadQuiz);

function reload(data) {
  if (usernamePasswordArray == null) usernamePasswordArray = []; //If there is no data in the online databse, it creates an array

  usernamePasswordArray = data.val();//Adding the incoming data into a object
  console.log(usernamePasswordArray);

}

function reloadQuiz(data) {
  //If there is no data in the online databse, it creates an array
  if (quizArray == null) quizArray = [];
  quizArray = data.val();//Adding the incoming data into a object
  console.log("test");

  for (i = 0; i < quizArray.length; i++) {

    if (typeof quizArray[i] == 'undefined') {
      console.log(i + " tetstst");
      quizArray.splice(i, 1);

    }

  }

  quizRef.update(quizArray);

  InsertionRate();

}

function changeOrder() {

  if (defaultSort === "alphabetical") {
    InsertionAlphabet();
    console.log(defaultSort);
    defaultSort = "rate";
    console.log(defaultSort);
    document.getElementById("changeOrderButton").innerHTML = "SORT RATING";
  }
  else if (defaultSort === "rate") {
    InsertionRate();
    defaultSort = "alphabetical";
    document.getElementById("changeOrderButton").innerHTML = "SORT ALPHABETICAL";
  }
}

function Login() {

  let UserCheck = document.getElementById("loginUsername").value;
  let noSpaces = replaceSpace(UserCheck);
  let passwordCheck = document.getElementById("loginPassword").value;
  for (i = 0; i < usernamePasswordArray.length; i++) {

    if (noSpaces === usernamePasswordArray[i][0]) {

      console.log("FoundUsername");

      if (passwordCheck === usernamePasswordArray[i][1]) {
        console.log("passwordFound")
        username = noSpaces;
        goToPage(quizPage);
        return;
      }
    }
  }
  alert("no matches found")
}

function NewMember() {

  let UserCheck = document.getElementById("newUsername").value;
  let noSpaces = replaceSpace(UserCheck);
  let passwordCheck = document.getElementById("newPassword").value;

  for (i = 0; i < usernamePasswordArray.length; i++) {

    if (noSpaces === usernamePasswordArray[i][0]) {

      alert("Username is already being used");

      return;
    }

    username = noSpaces;

  }

  usernamePasswordArray.push([noSpaces, passwordCheck]);
  UsernamePasswordRef.update(usernamePasswordArray);

  goToPage(quizPage);

}

function replaceSpace(userString) {

  let tempString = "";
  for (i = 0; i < userString.length; i++) {

    if (userString[i] === " ") {
      tempString = tempString + "_";

    } else {

      tempString = tempString + userString[i];

    }
  }

  return tempString;

}

function quizCreation() {

  quizName = document.getElementById("quizName").value;
  quizDescription = document.getElementById("quizDescription").value;

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

  quizArray.push([quizName, quizDescription, 0, username, questionArray, 0]);

  questionArray = [];

  quizRef.update(quizArray);

  InsertionRate();

  goToPage(quizPage);

  console.log(quizArray);

}

function fillCells(currentRow) {

  quizNumberCell.innerHTML = "<i class='fas fa-play w3-button w3-xxlarge w3-round-xlarge' onclick='playQuiz(" + currentRow + ")'></i>"
  //Accesing the cell and filling in the cell with values from the array and the objects
  quiznameCell.innerHTML = quizArray[currentRow][0];
  quizDescCell.innerHTML = quizArray[currentRow][1];
  quizRatingCell.innerHTML = quizArray[currentRow][2];
  authorCell.innerHTML = quizArray[currentRow][3];

}

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

}

function playQuiz(quizId) {
  score = 0;
  goToPage(questions);
  currentQuestion = 0;
  questionCounter = 1
  document.getElementById("quizQuestionNumber").innerHTML = questionCounter;
  lastQuizId = quizId;

  document.getElementById("question").innerHTML = quizArray[quizId][4][currentQuestion][0];
  document.getElementById("q1").innerHTML = quizArray[quizId][4][currentQuestion][1][0];
  document.getElementById("q2").innerHTML = quizArray[quizId][4][currentQuestion][2][0];
  document.getElementById("q3").innerHTML = quizArray[quizId][4][currentQuestion][3][0];
  document.getElementById("q4").innerHTML = quizArray[quizId][4][currentQuestion][4][0];

}

function nextQuestion(answerChoice) {

  if (quizArray[lastQuizId][4][currentQuestion][answerChoice][1] === true) {

    score++;
    alert("Correct");

  }
  else {
    alert("Wrong");

  }

  currentQuestion++;

  if (currentQuestion === quizArray[lastQuizId][4].length) {

    alert("Quiz Finished: Your score is " + score + "/" + currentQuestion);

    goToPage(results);
    document.getElementById("result").innerHTML = score;
    document.getElementById("amountOfQuestions").innerHTML = quizArray[lastQuizId][4].length
    return;

  }

  questionCounter++;
  document.getElementById("quizQuestionNumber").innerHTML = questionCounter;

  document.getElementById("question").innerHTML = quizArray[lastQuizId][4][currentQuestion][0];
  document.getElementById("q1").innerHTML = quizArray[lastQuizId][4][currentQuestion][1][0];
  document.getElementById("q2").innerHTML = quizArray[lastQuizId][4][currentQuestion][2][0];
  document.getElementById("q3").innerHTML = quizArray[lastQuizId][4][currentQuestion][3][0];
  document.getElementById("q4").innerHTML = quizArray[lastQuizId][4][currentQuestion][4][0];

}

function finishQuiz() {

  let rate = document.getElementById("rate").value;

  if (document.getElementById("rate").value === "") {
    alert("Please input a rating");
    return;

  }

  if (rate < 0 || rate > 10) {

    alert("Please input a number between 0 and 10");
    return;

  }

  let currentAmountOfRatings = quizArray[lastQuizId][5];

  currentAmountOfRatings++;
  console.log(currentAmountOfRatings);
  quizArray[lastQuizId][5] = currentAmountOfRatings;

  quizRef.update(quizArray);

  let currentAverageRate = quizArray[lastQuizId][2];

  let additionOfRates = currentAverageRate * (currentAmountOfRatings - 1);

  let newAdditionOfRates = parseFloat(additionOfRates) + parseFloat(rate);

  let newAverageRate = (Math.round((newAdditionOfRates / currentAmountOfRatings) * 10)) / 10;

  quizArray[lastQuizId][2] = newAverageRate;
  quizRef.update(quizArray);

  console.log(lastQuizId);
  var x = document.getElementById("quizTable").rows[lastQuizId + 2].cells;
  x[3].innerHTML = newAverageRate;

  goToPage(quizPage);

  InsertionRate();
}

function InsertionRate() {

  let first = 0;
  let last = quizArray.length - 1;
  let nextPos = last - 1;

  while (nextPos >= first) {

    let nextSwapItem = quizArray[nextPos];
    let nextItem = quizArray[nextPos][2];
    let current = nextPos;

    while (current < last && nextItem < quizArray[current + 1][2]) {

      current++;
      quizArray[current - 1] = quizArray[current];

    }

    quizArray[current] = nextSwapItem;
    nextPos--;
  }

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

  }

}

function InsertionAlphabet() {

  let first = 0;
  let last = quizArray.length - 1;
  let nextPos = last - 1;

  while (nextPos >= first) {

    let nextSwapItem = quizArray[nextPos];
    let nextItem = quizArray[nextPos][0];
    let current = nextPos;

    while (current < last && nextItem > quizArray[current + 1][0]) {

      current++;
      quizArray[current - 1] = quizArray[current];

    }

    quizArray[current] = nextSwapItem;
    nextPos--;
  }

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

  }

}

function binarySearch() {

  InsertionAlphabet();

  let searchItem = document.getElementById("search").value;

  if (searchItem === "") {
    alert("Not found");
    return;

  }

  let low = 0;
  let high = quizArray.length - 1;
  let found = false;
  let middle;
  let bottom;
  let top;
  let searchedArray = [];

  while (high >= low && found === false) {

    middle = Math.round((low + high) / 2);
    console.log(high);
    console.log(low);
    console.log(middle);


    if (startInclude(searchItem, quizArray[middle][0]) === true) {
      console.log("search = middle");
      found = true;

    }
    else if (searchItem < quizArray[middle][0]) {
      console.log("search < middle");
      high = middle - 1;


    }
    else {
      console.log("search > middle");

      low = middle + 1;

    }

  }

  if (found === true) {

    console.log(quizArray[middle][0]);

    if (middle === 0) {

      bottom = middle;

    }
    else {
      for (a = 1; a < middle + 1; a++) {


        if (startInclude(searchItem, quizArray[middle - a][0]) === true) {

          console.log(quizArray[middle - a][0]);

        }
        else {

          bottom = middle - a + 1;
          console.log(middle - a + 1 + " Bottom");
          break;

        }
      }
    }

    if (middle === quizArray.length - 1) {

      top = middle;

    } else {
      for (u = 1; u < ((quizArray.length) - (middle)); u++) {


        if (startInclude(searchItem, quizArray[middle + u][0]) === true) {

          console.log(quizArray[middle + u][0]);

        }
        else {

          console.log(middle + u - 1 + " top");
          top = middle + u - 1;
          break;

        }
      }
    }

    document.getElementById('tbody').innerHTML = ''; //Accesing the logBook
    var testRow = document.getElementById('tbody').insertRow(0);//Adding row to the table

    for (i = bottom; i < top + 1; i++) {
      console.log(i + " count");
      var quizTable = document.getElementById("quizTable"); //Accesing logbooks
      var row = quizTable.insertRow(quizTable.rows.length);//Inserting a new row
      quizNumberCell = row.insertCell(0); //Inserting the different cells 
      quiznameCell = row.insertCell(1);
      quizDescCell = row.insertCell(2);
      quizRatingCell = row.insertCell(3);
      authorCell = row.insertCell(4);

      quizNumberCell.innerHTML = "<i class='fas fa-play w3-button w3-xxlarge w3-round-xlarge' onclick='playQuiz(" + i + ")'></i>"
      //Accesing the cell and filling in the cell with values from the array and the objects

      quiznameCell.innerHTML = quizArray[i][0];
      quizDescCell.innerHTML = quizArray[i][1];
      quizRatingCell.innerHTML = quizArray[i][2];
      authorCell.innerHTML = quizArray[i][3];

    }
  }
  else {
    alert("Not found");
  }

}

function startInclude(searchText, includesText) {

  let searchTextArray = searchText.split("");
  let includesTextArray = includesText.split("");


  for (i = 0; i < searchTextArray.length; i++) {

    if (searchTextArray[i] !== includesTextArray[i]) {

      return false;

    }

  }

  return true;



}