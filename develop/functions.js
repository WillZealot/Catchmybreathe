let KeyApi = "b063e961132d34721eb67544bf97f624"

let pollutionUrl = "http://api.openweathermap.org/data/2.5/air_pollution?lat=28.538336&lon=-81.379234&appid="+ KeyApi;

fetch(pollutionUrl)
.then(function(response){
    return response.json();
})

.then(function(data){
    console.log(data);
})

document.querySelectorAll('a[href^="#"]').forEach(anchor =>{
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior : "smooth"
        });
    });
});


//Directs search to other pages according to set parameters.

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
          saveSearch(searchQuery);
          window.location.href = "./results.html";
        }
      }
    }, 20);
  }
  

  const savedSearchQuery = localStorage.getItem("searchQuery");
  // Saves the search to local storage
  function saveSearch(searchQuery) {
    if (typeof Storage !== "undefined") {
      localStorage.setItem("searchQuery", searchQuery);
    }
  }
  

  //searchButton and "Enter" key actions 
  const searchButton = document.querySelector("#userCityButton");
  const userCityInput = document.getElementById("userCityInput");
  
  searchButton.addEventListener("click", performSearch);
  userCityInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });