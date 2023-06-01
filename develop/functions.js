let KeyApi = "b063e961132d34721eb67544bf97f624"

  //Directs search to other pages according to set parameters.

  function performSearch() {
    let progressBar = document.querySelector(".progress");
    progressBar.value = 0;
    let interval = setInterval(function() {
      progressBar.value += 1;
      if (progressBar.value === progressBar.max) {
        clearInterval(interval);
        let searchQuery = userCityInput.value.trim();
        if (searchQuery === "") {
          window.location.href = "./404.html";
        } else {
          window.location.href = "./results.html";
        }
      }
    }, 20);
  }
  
  //searchButton and "Enter" key actions 
let searchButton = $("#userCityButton");
let userCityInput = $("#userCityInput");
searchButton.on("click", function() {
 performSearch();
 let cityInput = $("input").val();
 console.log(cityInput);
 // Retrieve the existing search queries from local storage
 let searchQueries = localStorage.getItem("searchQueries");
 if (searchQueries) {
  // If searchQueries already exists in local storage, parse it from a string to an array
  searchQueries = JSON.parse(searchQueries);
 } else {
  // If searchQueries does not exist in local storage, initialize it as an empty array
  searchQueries = [];
 }
 // Add the current search query to the array
 searchQueries.push(cityInput);
 // Save the updated search queries array back to local storage
 localStorage.setItem("searchQueries", JSON.stringify(searchQueries));
 let cityInfoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=" + KeyApi;
 fetch(cityInfoUrl)
  .then(function(response) {
   return response.json();
  })
  .then(function(data) {
   console.log(data);
   let searchLatEl = data[0].lat;
   let searchLonEl = data[0].lon;
   let pollutionUrl = "https://api.openweathermap.org/data/2.5/air_pollution?lat=" + searchLatEl + "&lon=" + searchLonEl + "&appid=" + KeyApi;
   fetch(pollutionUrl)
    .then(function(response) {
     return response.json();
    })
    .then(function(data) {
     console.log(data);
    });
  });
  
});



document.querySelectorAll('a[href^="#"]').forEach(anchor =>{
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior : "smooth"
        });
    });
});



  


  

// mobile menu
let burgerIcon = $('#burger');
let navbarMenu = $('#nav-links');

burgerIcon.on('click', () => {
  navbarMenu.classList.toggle('is-active');
});