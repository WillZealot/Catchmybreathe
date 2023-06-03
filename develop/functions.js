let KeyApi = "b063e961132d34721eb67544bf97f624";
// Define the saveSearch function
function saveSearch(cityInput, geocodingData) {
 let searchQueries = JSON.parse(localStorage.getItem("searchQueries")) || [];
 // Add the current search query to the array if it doesn't already exist.
 if (!searchQueries.includes(cityInput)) {
  searchQueries.push(cityInput);
 }
 // Save the updated array back to localStorage.
 localStorage.setItem("searchQueries", JSON.stringify(searchQueries));
 localStorage.setItem(cityInput, JSON.stringify(geocodingData));
}
// Directs search to other pages according to set parameters.
document.addEventListener("DOMContentLoaded", function() {
  function performSearch() {
    const progressBar = document.querySelector(".progress");
    progressBar.value = 0;
    const interval = setInterval(function() {
      progressBar.value += 1;
      if (progressBar.value === progressBar.max) {
        clearInterval(interval);
        const searchQuery = userCityInput.value.trim();
        if (searchQuery === "") {
          window.location.href = "./404.html";
        } else {
          let capitalizedSearchQuery = searchQuery
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          let letCityInfo =
            "https://api.openweathermap.org/geo/1.0/direct?q=" +
            searchQuery +
            "&limit=1&appid=" +
            KeyApi;

          fetch(letCityInfo)
            .then(function(response) {
              return response.json();
            })
            .then(function(data) {
              console.log(data);

              let searchLatEl = data[0].lat;
              let searchLonEl = data[0].lon;

              let pollutionUrl =
                "https://api.openweathermap.org/data/2.5/air_pollution?lat=" +
                searchLatEl +
                "&lon=" +
                searchLonEl +
                "&appid=" +
                KeyApi;

              fetch(pollutionUrl)
                .then(function(response) {
                  return response.json();
                })
                .then(function(pollutionData) {
                  console.log(pollutionData);
                  //Top Results Card City Info is here !
                  let recentlySearched = localStorage.getItem("searchQueries", [0]);
                  $("#searchedCityUser").text(recentlySearched);
                  //Bottom Results Card Info Here !
                  let userCityComponent = JSON.stringify([pollutionData.list[0].components.no2]);
                  console.log(userCityComponent);
                  $("airQ span").text(userCityComponent);
                  

                  // Save the geocoding data and perform the redirection to results.html
                  saveSearch(capitalizedSearchQuery, {
                    lat: searchLatEl,
                    lon: searchLonEl,
                    pollutionData: pollutionData
                  });

                 window.location.href = "./results.html";
                });
            });
        }
      }
    }, 20);
  }


 const searchButton = document.querySelector("#userCityButton");
 // Check if the search button element exists
 if (searchButton) {
  searchButton.addEventListener("click", function() {
   performSearch();
   let cityInput = $("input").val();
   console.log(cityInput);
  });
 }
 // Display the City from local storage on the card
const searchedCityUser = document.getElementById("searchedCityUser");
if (searchedCityUser) {
 const searchQueries = JSON.parse(localStorage.getItem("searchQueries"));
 if (searchQueries && searchQueries.length > 0) {
  let array = searchQueries;
  let lastElement = array[array.length - 1];
  let capitalizedCity = lastElement.charAt(0).toUpperCase() + lastElement.slice(1);
  console.log(capitalizedCity);
  searchedCityUser.textContent = capitalizedCity;
 }
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
 anchor.addEventListener("click", function(e) {
  e.preventDefault();
  document.querySelector(this.getAttribute("href")).scrollIntoView({
   behavior: "smooth"
  });
 });
});
// Mobile menu toggle
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');
if (burgerIcon && navbarMenu) {
 burgerIcon.addEventListener('click', function() {
  navbarMenu.classList.toggle('is-active');
 });
}
});