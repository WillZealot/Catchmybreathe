let KeyApi = "b063e961132d34721eb67544bf97f624";


let emojiResult = document.querySelector("#emojiConditions");
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

document.addEventListener("DOMContentLoaded", function() {

  //let airQElement = document.getElementById("airQ");
  //let no2Level = JSON.stringify(localStorage.getItem("pollutionData"));
  //airQElement.textContent = "NO2 Level: " + no2Level;

  // Display the first index of searchQueries on the card
  const searchedCityUser = document.getElementById("searchedCityUser");
  const searchQueries = JSON.parse(localStorage.getItem("searchQueries"));
  if (searchedCityUser && searchQueries && searchQueries.length > 0) {
    const firstSearchQuery = searchQueries[0];
    const capitalizedCity = firstSearchQuery.charAt(0).toUpperCase() + firstSearchQuery.slice(1);
    searchedCityUser.textContent = capitalizedCity;
  }

  const searchButton = document.querySelector("#userCityButton");
  // Check if the search button element exists
  if (searchButton) {
    searchButton.addEventListener("click", function() {
      let cityInput = document.querySelector("input").value;
      console.log(cityInput);
      performSearch(cityInput);
    });
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

  function performSearch(cityInput) {
    const progressBar = document.querySelector(".progress");
    progressBar.value = 0;
    progressBar.max = 100;

    const interval = setInterval(function() {
      progressBar.value += 1;

      if (progressBar.value === progressBar.max) {
        clearInterval(interval);
        if (cityInput === "") {
          window.location.href = "./404.html";
        } else {
          let capitalizedSearchQuery = cityInput
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          let letCityInfo = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=" + KeyApi;

          fetch(letCityInfo)
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
                .then(function(pollutionData) {
                  console.log(pollutionData);
                  let pollutionEle = pollutionData.list[0].components.co;
                  console.log(pollutionEle);
                  let searchQueries = JSON.parse(localStorage.getItem("searchQueries")) || [];
                  searchQueries.unshift(capitalizedSearchQuery);
                  searchQueries = searchQueries.slice(0, 5); // Limit the number of stored queries

                  localStorage.setItem("searchQueries", JSON.stringify(searchQueries));

                  // Save the geocoding data and perform the redirection to results.html
                  saveSearch(capitalizedSearchQuery, {
                    lat: searchLatEl,
                    lon: searchLonEl,
                    pollutionData: pollutionData
                  });

                  // Redirect to results.html
                  window.location.href = "./results.html";
                });
            });
        }
      }
    }, 20);
  }

});

