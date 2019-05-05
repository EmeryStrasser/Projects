
let usernamePasswordArray = [];

let database = firebase.database();

let UsernamePasswordRef = database.ref('/UsernamePassword');


UsernamePasswordRef.once('value').then(reload);


function reload(data) {
  if (usernamePasswordArray == null) usernamePasswordArray = []; //If there is no data in the online databse, it creates an array
  usernamePasswordArray = data.val();//Adding the incoming data into a object

}




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



