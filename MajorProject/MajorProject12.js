
let usernamePasswordArray = [];

let database = firebase.database();

let UsernamePasswordRef = database.ref('/UsernamePassword');




UsernamePasswordRef.once('value').then(reload);


function reload(data) {
  if (usernamePasswordArray == null) usernamePasswordArray = []; //If there is no data in the online databse, it creates an array
  usernamePasswordArray = data.val();//Adding the incoming data into a object
  console.log(usernamePasswordArray);

  usernamePasswordArray.push(["Emery", "strasser"]);
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

        return;
      }

    }

  }

  console.log("no matches found")
}

function NewMember() {




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

}



