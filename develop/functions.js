let KeyApi = "b063e961132d34721eb67544bf97f624"

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
  
  //searchButton and "Enter" key actions 
  const searchButton = document.querySelector("#userCityButton");
  const userCityInput = document.getElementById("userCityInput");

  searchButton.addEventListener("click", function(){
    //performSearch();
    let cityInput = $("input").val();
    console.log(cityInput);
    localStorage.setItem("searchQuery", cityInput);
    
    let letCityInfo = "https://api.openweathermap.org/geo/1.0/direct?q="+ cityInput +"&limit=1&appid=" + KeyApi;

        fetch(letCityInfo)
    .then(function(response){
        return response.json();
    })

    .then(function(data){
        console.log(data);
        
        let searchLatEl = data[0].lat;
        let searchLonEl = data[0].lon;

        let pollutionUrl = "https://api.openweathermap.org/data/2.5/air_pollution?lat="+ searchLatEl +"&lon="+ searchLonEl +"&appid="+ KeyApi;

        fetch(pollutionUrl)
        .then(function(response){
            return response.json();
        })
    
        .then(function(data){
            console.log(data);
        })
  });
})




document.querySelectorAll('a[href^="#"]').forEach(anchor =>{
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior : "smooth"
        });
    });
});



  


  

