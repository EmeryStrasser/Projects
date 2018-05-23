let totalHoursDriven;
let totalDayHours;
let totalNightHours;

let pages = document.getElementsByClassName("pages");

for (let i = 0; i < pages.length; i++) {
  pages[i].style.display = "none";
}

let startingPage = document.getElementById("tablePage");

startingPage.style.display = "block";

function changePages(currentPage, newPage) {
  const pageToHide = document.getElementById(currentPage);
  const pageToShow = document.getElementById(newPage);

  pageToHide.style.display = "none";
  pageToShow.style.display = "block";
}
