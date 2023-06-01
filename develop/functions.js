let KeyApi = "b063e961132d34721eb67544bf97f624";

// Define the saveSearch function
function saveSearch(cityInput, geocodingData) {
  // Retrieve the existing searchQueries array from localStorage or create a new empty array
  let searchQueries = JSON.parse(localStorage.getItem("searchQueries")) || [];

  // Add the current search query to the array if it doesn't already exist
  if (!searchQueries.includes(cityInput)) {
    searchQueries.push(cityInput);
  }

  // Save the updated array back to localStorage
  localStorage.setItem("searchQueries", JSON.stringify(searchQueries));

  // Save the geocoding data for the current search query
  localStorage.setItem(cityInput, JSON.stringify(geocodingData));
}

// Directs search to other pages according to set parameters.
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
        letCityInfo =
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

                // Save the geocoding data and perform the redirection
                saveSearch(searchQuery, {
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

// Check if the DOM content is loaded before accessing the elements
document.addEventListener("DOMContentLoaded", function() {
  // Get the search button element
  const searchButton = document.querySelector("#userCityButton");
  const userCityInput = document.getElementById("userCityInput");

  // Check if the search button element exists
  if (searchButton) {
    // Add click event listener to the search button
    searchButton.addEventListener("click", function() {
      performSearch();
      let cityInput = $("input").val();
      console.log(cityInput);
    });
  }
});

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