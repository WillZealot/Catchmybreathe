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