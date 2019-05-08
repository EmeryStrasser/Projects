
let usernamePasswordArray = [];

let database = firebase.database();

let UsernamePasswordRef = database.ref('/UsernamePassword');




UsernamePasswordRef.once('value').then(reload);


function reload(data) {
  if (usernamePasswordArray == null) usernamePasswordArray = []; //If there is no data in the online databse, it creates an array
  usernamePasswordArray = data.val();//Adding the incoming data into a object
  console.log(usernamePasswordArray);


  UsernamePasswordRef.update(usernamePasswordArray);

}


function Login() {

  let UserCheck = document.getElementById("loginUsername").value;

  let passwordCheck = document.getElementById("loginPassword").value;
  for (i = 0; i < usernamePasswordArray.length; i++) {
    let temporaryArray = [];
    temporaryArray = usernamePasswordArray[i];

    if (UserCheck === temporaryArray[0]) {

      console.log("FoundUsername");

      if (passwordCheck === temporaryArray[1]) {

        console.log("passwordFound")

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

    let temporaryArray = [];
    temporaryArray = usernamePasswordArray[i];

    if (UserCheck === temporaryArray[0]) {

      alert("Username is already being used");

      return;
    }
    else if (passwordCheck === temporaryArray[1]) {

      alert("Password is already being used");


      return;
    }

  }

  console.log("can use this");

  usernamePasswordArray.push([UserCheck, passwordCheck]);
  UsernamePasswordRef.update(usernamePasswordArray);

  goToPage(quizPage);

}



//UsernamePasswordRef.update(usernamePasswordArray);

/** This function is used to hide all the different pages and then shows a single page based on the parameter
 Parameters: 
   pagenumber(string) - Allows the choice of choosing what page to show
 Return: 
   Returns null */

goToPage(questionCreation);//Calls code to change page at beginning of program

function goToPage(pageNumber) {

  document.querySelectorAll('.pages').forEach((e) => e.hidden = true); //hides all pages with a class of pages
  pageNumber.hidden = false;//shows page needed

  document.getElementById("newUsername").value = "";
  document.getElementById("newPassword").value = "";
  document.getElementById("loginUsername").value = "";
  document.getElementById("loginPassword").value = "";


}



