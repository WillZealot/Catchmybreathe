//API key
let KeyApi = "b063e961132d34721eb67544bf97f624";

// Functions to open and close a modal
function openModal($el) {
  $el.classList.add('is-active');
}

function closeModal($el) {
  $el.classList.remove('is-active');
}

// Add a click event on buttons to open a specific modal
(document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
  const modal = $trigger.dataset.target;
  const $target = document.getElementById(modal);

  $trigger.addEventListener('click', () => {
    openModal($target);
  });
});

// Add a click event on various child elements to close the parent modal
(document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
  const $target = $close.closest('.modal');

  $close.addEventListener('click', () => {
    closeModal($target);
  });
});


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

document.addEventListener("DOMContentLoaded", function () {

  // Display the first index of searchQueries on the card
  const searchedCityUser = document.getElementById("searchedCityUser");
  const searchQueries = JSON.parse(localStorage.getItem("searchQueries"));

  if (searchedCityUser && searchQueries && searchQueries.length > 0) {
    const firstSearchQuery = searchQueries[0];
    const capitalizedCity =
      firstSearchQuery.charAt(0).toUpperCase() + firstSearchQuery.slice(1);
    searchedCityUser.textContent = capitalizedCity;
    setAirDataEmoji(capitalizedCity);
  }

  const searchButton = document.querySelector("#userCityButton");

  // Check if the search button element exists
  if (searchButton) {
    searchButton.addEventListener("click", function () {
      let cityInput = document.querySelector("input").value;
      console.log(cityInput);
      performSearch(cityInput);
    });
  }
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Mobile menu toggle
  const burgerIcon = document.querySelector("#burger");
  const navbarMenu = document.querySelector("#nav-links");
  if (burgerIcon && navbarMenu) {
    burgerIcon.addEventListener("click", function () {
      navbarMenu.classList.toggle("is-active");
    });
  }

  function performSearch(cityInput) {
    const progressBar = document.querySelector(".progress");
    progressBar.value = 0;
    progressBar.max = 100;
    const interval = setInterval(function () {
      progressBar.value += 1;
      if (progressBar.value === progressBar.max) {
        clearInterval(interval);
        if (cityInput === "") {
     // Replace "modalId" with the actual ID of your modal element
          openModal(document.getElementById("modal-js-example")); 
        } else {
          //Capitalizes first letter of all words
          let capitalizedSearchQuery = cityInput
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          let letCityInfo =
            "https://api.openweathermap.org/geo/1.0/direct?q=" +
            cityInput +
            "&limit=1&appid=" +
            KeyApi;
          fetch(letCityInfo)
            .then(function (response) {
              if (!response.ok) {
                window.location.href = "./404.html";
              }
              return response.json();
            })
            .then(function (data) {
              console.log(data);

              if (typeof data[0]?.lat === "undefined") {
                openModal(document.getElementById("modal-js-example")); 
                return; 
                // Stop execution here if lat is undefined
              }
              //Location Search with pollution data
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
                .then(function (response) {
                  if (!response.ok) {
                    window.location.href = "./404.html";
                  }
                  return response.json();
                })
                .then(function (pollutionData) {
                  console.log(pollutionData);
                  let pollutionEle = pollutionData.list[0].components.co;
                  console.log(pollutionEle);

                  let searchQueries =
                    JSON.parse(localStorage.getItem("searchQueries")) || [];
                  searchQueries.unshift(capitalizedSearchQuery);
                  // Limit the number of stored queries for display
                  searchQueries = searchQueries.slice(0, 5); 
                  localStorage.setItem(
                    "searchQueries",
                    JSON.stringify(searchQueries)
                  );
                  // Save the geocoding data and perform the redirection to results.html
                  saveSearch(capitalizedSearchQuery, {
                    lat: searchLatEl,
                    lon: searchLonEl,
                    pollutionData: pollutionData,
                  });
                  // Redirect to results.html
                  window.location.href = "./results.html";
                  getAirData();
                });
            });
        }
      }
    }, 20);
  }

  //Locally saved emoji display depending on air quality conditions
  function setAirDataEmoji(city) {
    console.log(city);
    let weatherData = JSON.parse(localStorage.getItem(city));
    console.log(weatherData);
    let pollutionData = weatherData.pollutionData;
    console.log(pollutionData);
    let pollutionEle = pollutionData.list[0].components.o3;
    console.log(pollutionEle);
    let emojiResult = document.querySelector("#conditionsEmoji");
    let airQElement = document.querySelector("#airQ");

    if (pollutionEle < 70) {
      emojiResult.setAttribute("src", "./develop/images/Good Conditions.png");
      airQElement.textContent = "Good";
    } else if (pollutionEle > 150) {
      emojiResult.setAttribute("src", "./develop/images/Bad Conditions.png");
      airQElement.textContent = "Bad";
    } else {
      emojiResult.setAttribute("src", "./develop/images/Ok Conditions.png");
      airQElement.textContent = "Moderate";
    }
  }

  // Display recent searches when the search input field is clicked
  const userCityInput = document.querySelector("#userCityInput");
  const searchList = document.querySelector("#searchList");

  function displayRecentSearches() {
    // Clear previous search items
    searchList.innerHTML = ""; 
    const searchQueries = JSON.parse(localStorage.getItem("searchQueries"));
    if (searchQueries && searchQueries.length > 0) {
      const displayedQueries = [];
      searchQueries.forEach(function (query) {
        if (!displayedQueries.includes(query)) {
          const listItem = document.createElement("li");
          listItem.textContent = query;
          listItem.classList.add("recent-search-item");
          searchList.appendChild(listItem);
          displayedQueries.push(query);
        }
      });
    }
  }

  // Add click event listener to recent search items
  if (searchList) {
    searchList.addEventListener("click", function (event) {
      if (event.target && event.target.matches(".recent-search-item")) {
        const clickedQuery = event.target.textContent;
        userCityInput.value = clickedQuery;
        performSearch(userCityInput.value);
      }
    });
  }

  // Add event listener to clear recent searches button
  const clearSearchesButton = document.querySelector("#clearSearchesButton");
  if (clearSearchesButton) {
    clearSearchesButton.addEventListener("click", function () {
      localStorage.removeItem("searchQueries");
      searchList.innerHTML = "";
    });
  }

  // Event listener for userCityInput click event
  if (userCityInput) {
    userCityInput.addEventListener("click", function () {
      displayRecentSearches();
    });
  }
});
