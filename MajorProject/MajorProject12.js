
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
// let quizArray = [[Quiz Name, Quiz Description, Time limit, [quiz ID, [Question, [Answer1, Correct/Wrong],[Answer2, Correct/Wrong],[Answer3, Correct/Wrong],[Answer4, Correct/Wrong]]]]]


UsernamePasswordRef.once('value').then(reload);
quizRef.once('value').then(reloadQuiz);

function reload(data) {
  if (usernamePasswordArray == null) usernamePasswordArray = []; //If there is no data in the online databse, it creates an array
  if (quizArray == null) quizArray = [];
  usernamePasswordArray = data.val();//Adding the incoming data into a object
  console.log(usernamePasswordArray);


  UsernamePasswordRef.update(usernamePasswordArray);

}

function reloadQuiz(data) {
  //If there is no data in the online databse, it creates an array
  if (quizArray == null) quizArray = [];
  quizArray = data.val();//Adding the incoming data into a object
  console.log(quizArray);


  quizRef.update(quizArray);

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
  console.log(UserCheck);
  for (i = 0; i < usernamePasswordArray.length; i++) {

    // let temporaryArray = [];
    // temporaryArray = usernamePasswordArray[i];

    if (UserCheck === usernamePasswordArray[i][0]) {

      alert("Username is already being used");

      return;
    }
    else if (passwordCheck === usernamePasswordArray[i][1]) {

      alert("Password is already being used");


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



}

function questionCreation() {

  document.getElementById("questionNumber").innerHTML = questionNumber;
  questionNumber++;

  let question = document.getElementById("quizQuestion").value;
  let answer1 = document.getElementById("answer1").value;
  let answer2 = document.getElementById("answer2").value;
  let answer3 = document.getElementById("answer3").value;
  let answer4 = document.getElementById("answer4").value;

  let checkbox1 = document.getElementById("Answer1Correct").value;
  let checkbox2 = document.getElementById("Answer2Correct").value;
  let checkbox3 = document.getElementById("Answer3Correct").value;
  let checkbox4 = document.getElementById("Answer4Correct").value;

  questionArray.push([question, [answer1, checkbox1], [answer2, checkbox2], [answer3, checkbox3], [answer4, checkbox4]]);

  document.getElementById("quizQuestion").value = "";
  document.getElementById("answer1").value = "";
  document.getElementById("answer2").value = "";
  document.getElementById("answer3").value = "";
  document.getElementById("answer4").value = "";
  document.getElementById("Answer1Correct").value = "";
  document.getElementById("Answer2Correct").value = "";
  document.getElementById("Answer3Correct").value = "";
  document.getElementById("Answer4Correct").value = "";


}


function finishQuizCreation() {

  let question = document.getElementById("quizQuestion").value;
  let answer1 = document.getElementById("answer1").value;
  let answer2 = document.getElementById("answer2").value;
  let answer3 = document.getElementById("answer3").value;
  let answer4 = document.getElementById("answer4").value;

  let checkbox1 = document.getElementById("Answer1Correct").value;
  let checkbox2 = document.getElementById("Answer2Correct").value;
  let checkbox3 = document.getElementById("Answer3Correct").value;
  let checkbox4 = document.getElementById("Answer4Correct").value;

  questionArray.push([question, [answer1, checkbox1], [answer2, checkbox2], [answer3, checkbox3], [answer4, checkbox4]]);

  document.getElementById("quizQuestion").value = "";
  document.getElementById("answer1").value = "";
  document.getElementById("answer2").value = "";
  document.getElementById("answer3").value = "";
  document.getElementById("answer4").value = "";
  document.getElementById("Answer1Correct").value = "";
  document.getElementById("Answer2Correct").value = "";
  document.getElementById("Answer3Correct").value = "";
  document.getElementById("Answer4Correct").value = "";


  quizArray.push([quizName, quizDescription, timeLimit, username, questionArray]);

  questionArray = [];

  quizRef.update(quizArray);

  goToPage(quizPage);

  console.log(quizArray);

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



