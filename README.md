# Catchmybreath

Welcome to "Catch My Breath", a versitile application that is designed to help anyone find a vacation spot with good air quality to match you health parameters and location desires.

Whether you have respiratory conditions, concerns with respiratory health or you are simply just looking for a place to kick back, relax and breathe in all that nature has to offer. Experience air, not as you would in the city, but free of toxic levels of carbon dioxide. 

#### User Story: 

Given As a user going on vacation with respiratory health issues
Then I search a city I plan on visiting
When I search a city and click on a button 
Then air quality information will display with the city researched
When I leave a blank statement to search and click on the button
Then I'm advised to write a valid entry
When the city displays with air quality
Then I can research the vacation spot myself easily with a link
When I want to know how this project was made
Then a link will redirect the page to show details



#### The Purpose
"Catch My Breath" helps you find out just how good the air quality is in your desired vacation spot. How do we do this? Simple!
First search the name of the city that you desire to vacation in in the search box on the home page.

![City Search Box](images/Search-City.png)

Once a city has been input, a new screen will emerge showing the CO2 levels!
![Results](images/City%20Search%20Result.png)
#### How we do It
To get this information, we used two API keys, The first one being "https://api.openweathermap.org/data/2.5/air_pollution?lat=". This one is used to measure the CO2 levels in the air. "https://api.openweathermap.org/geo/1.0/direct?q=" this one is used to grab and display information about the desired vacation destination.

Ultimately, this app is made to help those seek and find the safe and healthly life they deserve. 


#### Deployment Link: https://willzealot.github.io/Catchmybreathe/


#### References:
1. Weather API: https://openweathermap.org/api/air-pollution
2. Bulma: https://bulma.io/
3. How to plan for coding projects: https://www.youtube.com/watch?v=qS4mvrWWO_M
4. AirBnb: https://www.airbnb.com/
5. DOM: https://www.w3.org/TR/REC-DOM-Level-1/introduction.html
6. Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
7. JSON Parse: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
8. JSON Stringify: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify



### Credits
1. Francisco González
2. William Tikhonenko
3. Noah Nelson
4. Pablo Roman
5. Harrison Miner

### MIT License

Copyright (c) 2023 WillZealot

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.