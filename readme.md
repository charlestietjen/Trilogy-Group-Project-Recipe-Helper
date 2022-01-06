# Recipe Helper
![GitHub contributors](https://img.shields.io/github/contributors/charlestietjen/Trilogy-Group-Project-1)
![GitHub last commit](https://img.shields.io/github/last-commit/Charlestietjen/Trilogy-Group-Project-1)

### Links:
```
Deployed link: click[Deployed Link](https://jaimitpatel.github.io/coding-quiz/#)
Github link: click[Github Link](https://github.com/jaimitpatel/coding-quiz)
```

## About the Project:
The main function of this site is to help users search for randomized recipies and cocktails. <br>
The user has the ability to choose a specific type of cuisine that they would like from a dropdown menu, <br> 
and the Recipe Helper would populate 20 different choices that the user could cycle through. <br>
The user also has the option to select a randomized cocktail to pair with their recipe of choice. <br>
This is done using two different API's; [Edamam](https://developer.edamam.com/edamam-docs-recipe-api) , and [CocktailDB](https://www.thecocktaildb.com/api.php)




## Project Requirements:
```python
- Use a CSS framework other than Bootstrap.
- Be deployed to GitHub Pages.
- Be interactive (i.e: accept and respond to user input).
- Use at least two server-side APIs.
- Does not use alerts, confirms, or prompts (use modals).
- Use client-side storage to store persistent data.
- Be responsive.
- Have a polished UI.
- Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id-naming conventions, indentation, quality comments, etc.).
-Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).
```

## Acceptance Criteria:
```python
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```
## API Details:
### Edamam:
In order to use this API, we used an async function to pull data from Edamam's API Endpoints using 3 different parameters; <br>
##### Random: <li> this string is set to true, in order to always give a random set of recipes, instead of the same 20. </li>
##### Type: <li> this is set to Main Course, because we do not want the api to pull results for any drinks, thus allowing it to only pull food items. </li>
##### CuisineType: <li> this is set as a variable in the function. This is the main part of the script, as this incorporates user input and allows users to select the cuisine type they would like. </li>
```javascript
async function fetchMeal(){
  let APP_ID = ""
  let APP_KEY = ""
  let TYPE = cuisineType
  let response = await fetch ('https://api.edamam.com/api/recipes/v2?type=public&app_id=' + APP_ID + '&app_key=' + APP_KEY + '&random=true&dishType=Main%20course&cuisineType=' + TYPE)
  if(response.ok){
    let data = await response.json()
    recipeData = data;
    fillRecipeModal(0);
  } else {
    badResponseModal();
  };
};
```
##### The Request URL: https://api.edamam.com/api/recipes/v2?type=public&app_id=' + APP_ID + '&app_key=' + APP_KEY + '&q=' + '&random=true&dishType=Main%20course&cuisineType=' + TYPE


### CocktailDB:
This API was very straight forward, as it only allowed one random search per call. Which means that if the user wanted to <br>
try another recipe, they would have to make another API call request.
```javascript
async function fetchCocktail() {
  let API_KEY = "1"
  let response = await fetch ('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  let data2 = await response.json()
  cocktailData = data2;
  resultCocktailDirectionsel.innerText = cocktailData.drinks[0].strInstructions;
  resultSection.classList.remove('hide');
  setCocktailIngredients();
```
##### Endpoint: https://www.thecocktaildb.com/api/json/v1/1/random.php

### Diagrams:






### Contributors:
1. Charles (Page Logic)
2. Abi (CSS and Styling)
3. Saj (Page Logic)
4. Jaimit (API Information)
©2021 All Rights Reserved.

