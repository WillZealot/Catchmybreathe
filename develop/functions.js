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

document.addEventListener("DOMContentLoaded", function() {
  function getPollutionLevelText(userCityComponent) {
    // Define your logic to determine the pollution level text based on the userCityComponent value
    if (userCityComponent < 50) {
      return "Low pollution level";
    } else if (userCityComponent < 100) {
      return "Moderate pollution level";
    } else {
      return "High pollution level";
    }
  }
  function performSearch() {
    const progressBar = document.querySelector(".progress");
    progressBar.value = 0;
    progressBar.max = 100;

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
                  let userCityComponent = pollutionData.list[0].components.co;
                  console.log(userCityComponent);

                  // Get the pollution level text
                  let pollutionLevelText = getPollutionLevelText(userCityComponent);

                  // Display the pollution level on the card
                  let contaminantLevels = document.getElementById("contaminantLevels");
                  if (contaminantLevels) {
                    contaminantLevels.textContent = pollutionLevelText;
                  }

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


  const searchButton = document.querySelector("#userCityButton");
  // Check if the search button element exists
  if (searchButton) {
    searchButton.addEventListener("click", function() {
      let cityInput = $("input").val();
      console.log(cityInput);
      performSearch(cityInput);
    });
  }

   // Display the first index of searchQueries on the card
   const searchedCityUser = document.getElementById("searchedCityUser");
   const searchQueries = JSON.parse(localStorage.getItem("searchQueries"));
   if (searchedCityUser && searchQueries && searchQueries.length > 0) {
     const firstSearchQuery = searchQueries[0];
     const capitalizedCity = firstSearchQuery.charAt(0).toUpperCase() + firstSearchQuery.slice(1);
     searchedCityUser.textContent = capitalizedCity;
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
