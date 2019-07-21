
let playingMusic = true;

//Creation of the 2 main arrays used in the application
let usernamePasswordArray = [];
let quizArray = [];

//The variables needed to connect the application to the firebase database and to use the functionality of firebase
let database = firebase.database();
let UsernamePasswordRef = database.ref('/UsernamePassword');
let quizRef = database.ref('/quizDB');

//The default sorting mechansism of the quiz
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

UsernamePasswordRef.once('value').then(reloadUsername);
quizRef.once('value').then(reloadQuiz);
audioSection.play();


//This function is used, so that the application doesnt instantanously try and access the usernameDatabase before it grabbed the data from firebase database
function reloadUsername(data) {

  if (usernamePasswordArray == null) usernamePasswordArray = []; //If there is no data in the online database, it creates an empty array

  usernamePasswordArray = data.val();//Adding the incoming data into a object

  //Once the database has been accessed, each item in the database is checked to see if it is empty
  for (i = 0; i < usernamePasswordArray.length; i++) {

    //Checking the item to see if it has a value
    if (typeof usernamePasswordArray[i] == 'undefined') {

      //If the item doesnt have a value, that item is spliced out of the array so that there are no empty values int he databse because that could cause issues
      usernamePasswordArray.splice(i, 1);

    }

  }

  UsernamePasswordRef.set(usernamePasswordArray); //Once the appropiate empty fields are spliced from the array, the external firebase database is updated with the new array
}


//This function is used, so that the application doesnt instantanously try and access the quiz database before it grabbed the data from firebase database
function reloadQuiz(data) {

  //If there is no data in the online databse, it creates an empty array
  if (quizArray == null) quizArray = [];

  quizArray = data.val();//Adding the incoming data into a object

  //Once the database has been accessed, each item in the database is checked to see if it is empty
  for (i = 0; i < quizArray.length; i++) {

    //Checking the item to see if it has a value
    if (typeof quizArray[i] == 'undefined') {

      //If the item doesnt have a value, that item is spliced out of the array so that there are no empty values int he databse because that could cause issues
      quizArray.splice(i, 1);
      i--;

    }

  }

  quizRef.set(quizArray);//Once the appropiate empty fields are spliced from the array, the external firebase database is updated with the new array

  InsertionRate();  //Once all the empty quizzes are spliced, the array is then sorted via an insertion sort

}


//This function is used so that when you click the button to change the order of sorting, it will change the button to the oppisite method of sorting that is currently displayed so that it switched between the 2
function changeOrder() {

  //Checks what the next sort is supposed to be
  if (defaultSort === "alphabetical") {

    InsertionAlphabet(); //Sorts the array via alphebetical order

    defaultSort = "rate"; //Changes the next sort to sort by rating

    document.getElementById("changeOrderButton").innerHTML = "SORT RATING"; //Changed the label on the button to reflect the following sorting mechanism
  }
  else if (defaultSort === "rate") {
    InsertionRate(); //Sorts the array via rating
    defaultSort = "alphabetical";//Changes the next sort to sort by alphebetical order
    document.getElementById("changeOrderButton").innerHTML = "SORT ALPHABETICAL"; //Changed the label on the button to reflect the following sorting mechanism

  }
}


//This function is used to login to the application. It will loop through the username array and check for the value which the user has put in for there username and password. If it is found it will grant them access to the application
function Login() {

  let UserCheck = document.getElementById("loginUsername").value; //Creating a variable which has the evalue of the username which the user has put in
  let noSpaces = replaceSpace(UserCheck); //Creates a new variable which is the same as the userCheck variable but all the spaces have been replaced by underscores
  let passwordCheck = document.getElementById("loginPassword").value; //Creates a new variable to store the password which the user has placed in

  for (i = 0; i < usernamePasswordArray.length; i++) {//Looping through the array

    if (noSpaces === usernamePasswordArray[i][0]) {//Looping through all the usernames and checking if there are any matches

      //If the username has matched, it will then check if the passwords match
      if (passwordCheck === usernamePasswordArray[i][1]) {

        username = noSpaces; //If it does match then it will store the current username in a variable for later user
        goToPage(quizPage);//It will then access the main quiz page
        return;
      }
    }
  }
  alert("no matches found") //If there are no matches for the username and/or password, it will alert the user
}


//A function used to create a new member for the application adn check to see if it is already in use
function NewMember() {

  let UserCheck = document.getElementById("newUsername").value; //Creating a variable which has the evalue of the username which the user has put in
  let noSpaces = replaceSpace(UserCheck);//Creates a new variable which is the same as the userCheck variable but all the spaces have been replaced by underscores
  let passwordCheck = document.getElementById("newPassword").value; //Creates a new variable to store the password which the user has placed in

  for (i = 0; i < usernamePasswordArray.length; i++) {//Looping through the array

    if (noSpaces === usernamePasswordArray[i][0]) {//Looping through all the usernames and checking if there are any matches

      alert("Username is already being used");//If there are username matches, then it will alret the user that the usename is already being used

      return;
    }

    username = noSpaces; //It will then store the current user for later use in the application

  }

  usernamePasswordArray.push([noSpaces, passwordCheck]); //Once it has checked that there are no matching usernames, it will push the new usenrame and password to the username array
  UsernamePasswordRef.update(usernamePasswordArray); //It will then update the external firebase databse with the new values

  goToPage(quizPage); //It will then grant the user access to the application, this function takes in the nae of the page which will be accesed

}

//This function is uses to replace all spaces within a username to underscores, it takes in a string and returns thr same string without spaces
//THIS IS THE STRING MANIPULATION
function replaceSpace(userString) {

  let tempString = ""; //It creates a temporary empty string which will later hold the actual string
  for (i = 0; i < userString.length; i++) { //Looping through each character of the username string

    if (userString[i] === " ") { //If the chracter is a space it will replace the temporary string with itself followed by an underscore
      tempString = tempString + "_"; //Replacing it with an underscore

    } else {

      tempString = tempString + userString[i]; //If the character is not a space, it will add the current letter to the temporray string

    }
  }

  return tempString; //Returning the new string which has been manipulated

}

//This function is used to create a new quiz, it is called via a button
function quizCreation() {

  quizName = document.getElementById("quizName").value; //Storing the name of the quiz in a variable
  quizDescription = document.getElementById("quizDescription").value; //Storing the description in a variablr

  questionNumber = 1; //The default starting quiz question number
  document.getElementById("questionNumber").innerHTML = questionNumber; //Replacing a heading with the current quiz number

}

//Once the quiz itself has been created, the user then adds questions to the quiz, it is called whenever the user creates a new question
function questionCreation() {

  //Storing all the appropiate data for the question inside variables
  let question = document.getElementById("quizQuestion").value;
  let answer1 = document.getElementById("answer1").value;
  let answer2 = document.getElementById("answer2").value;
  let answer3 = document.getElementById("answer3").value;
  let answer4 = document.getElementById("answer4").value;

  //Storing which answer is the correct answer
  let checkbox1 = document.getElementById("Answer1Correct").checked;
  let checkbox2 = document.getElementById("Answer2Correct").checked;
  let checkbox3 = document.getElementById("Answer3Correct").checked;
  let checkbox4 = document.getElementById("Answer4Correct").checked;

  if (answer1 === "" || answer2 === "" || answer3 === "" || answer4 === "") { //Checking to see whether all answers have are not empty

    alert("Please input all answers") //If they are empty the user gets an alert and cannot proceed
    return
  }
  if (checkbox1 === false && checkbox2 === false && checkbox3 === false && checkbox4 === false) { //Checking whether at least 1 answer is correct

    alert("Please have at least one correct answer") //If none are correct then the user gets an alert and cant proceed
    return
  }
  questionNumber++; //Updating the current question number

  document.getElementById("questionNumber").innerHTML = questionNumber; //Updating the heading to reflect the current question number


  questionArray.push([question, [answer1, checkbox1], [answer2, checkbox2], [answer3, checkbox3], [answer4, checkbox4]]); //Adding a new record to the question array, which is composed of the question, the 4 answers, and which ones are correct.


  //Resetting the page back to blank for the next questions creaton
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

//Once all the questions have been created, this function 
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

  if (answer1 === "" || answer2 === "" || answer3 === "" || answer4 === "") {

    alert("Please input all answers")
    return
  }
  if (checkbox1 === false && checkbox2 === false && checkbox3 === false && checkbox4 === false) {

    alert("Please have at least one correct answer")
    return
  }

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

function mute() {

  if (playingMusic === true) {
    audioSection.pause();
    playingMusic = false;
  } else {

    audioSection.play();
    playingMusic = true;
  }
}


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
    if (defaultSort === "alphabetical") {
      InsertionRate();
    }
    else if (defaultSort === "rate") {
      InsertionAlphabet();
    }
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


    if (startInclude(searchItem.toLowerCase(), quizArray[middle][0].toLowerCase()) === true) {
      console.log("search = middle");
      found = true;

    }
    else if (searchItem.toLowerCase() < quizArray[middle][0].toLowerCase()) {
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
    if (defaultSort === "alphabetical") {
      InsertionRate();
    }
    else if (defaultSort === "rate") {
      InsertionAlphabet();
    }
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