/** This function is used to hide all the different pages and then shows a single page based on the parameter
 Parameters: 
   pagenumber(string) - Allows the choice of choosing what page to show
 Return: 
   Returns null */

function goToPage(pageNumber) {

    document.querySelectorAll('.pages').forEach((e) => e.hidden = true); //hides all pages with a class of pages
    pageNumber.hidden = false;//shows page needed

}