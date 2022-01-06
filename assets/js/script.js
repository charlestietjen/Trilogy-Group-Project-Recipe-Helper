let searchButton = document.querySelector("#recipes")
let searchDrink = document.querySelector("#cocktail")
var cuisineType = "";
var recipeData;
var cocktailData;
var selectedRecipeData;
var cuisineTypeArr = ["American", "Asian", "Caribbean", "Central Europe", "Chinese", "Eastern Europe", "French", "Indian", "Japanese", "Mexican", "Middle Eastern", "South American", "South East Asian"];
var cuisineDDEl = document.querySelector("#cuisine-container");
var cuisineBtnEl = document.querySelector("#cuisine");
var modalImgContEl = document.querySelector("#modal-image");
var modalIngLEl = document.querySelector("#ingredient-lines")
var modalTitleEl = document.querySelector("#modal-title");
var modalNextBtn = document.querySelector("#modal-next-btn");
var modalSelectBtn = document.querySelector("#modal-select-btn");
var cautionsContEl = document.querySelector("#recipe-cautions");
var recipeCardContEl = document.querySelector("#recipe-card-container");
var cocktailCardContEl = document.querySelector("#cocktail-card-container");
var resultMealLabelEl = document.querySelector("#result-meal-label");
var resultMealImgEl = document.querySelector("#result-meal-img");
var resultMealIngredientsEl = document.querySelector("#result-meal-ingredients");
var resultCocktailLabelEl = document.querySelector("#result-cocktail-label");
var resultCocktailImgEl = document.querySelector("#result-cocktail-img");
var resultCocktailIngredientsEl = document.querySelector("#result-cocktail-ingredients");
var resultMealDirectionsEl = document.querySelector("#result-meal-directions");
var resultCocktailDirectionsel = document.querySelector("#result-cocktail-directions");
var resultSection = document.querySelector('#result');
var cRecipeInd = 0;
var currentCocktailIngredients = [];


searchButton.addEventListener("click", () => {
  mealFetch()
})

searchDrink.addEventListener("click", () => {
  cocktailFetch()
})
// JS 1

// edamam fetch
async function mealFetch(){
  let APP_ID = "8ad7c3e9"
  let APP_KEY = "bf56552f866dd3ccad5d1f970588ac81"
  let TYPE = cuisineType
  let response = await fetch ('https://api.edamam.com/api/recipes/v2?type=public&app_id=' + APP_ID + '&app_key=' + APP_KEY + '&random=true&dishType=Main%20course&cuisineType=' + TYPE)
  if(response.ok){
    let data = await response.json()
    // We fill a global variable with the data so we can access it without passing arguments all over
    recipeData = data;
    // This function fills the modal that the HTML has just shown and begins modal handling
    fillRecipeModal(0);
  } else {
    // This function shows an error message in the modal if the request is not ok for whatever reason, should only occur if edamam is down
    badResponseModal();
  };
};

// cocktaildb fetch 
async function cocktailFetch() {
  let API_KEY = "1"
  let response = await fetch ('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  let data2 = await response.json()
  cocktailData = data2;
  // This function is located at the bottom, it pushes all cocktail ingredients into an arrray and filters out null entries
  setCocktailIngredients();
  // This function fills a card div with cocktail information and attaches it to a container below the cocktail button
  fillCocktailCard();
  saveRecipes();
};

//Page logic
// Default dropdown value
const DEFAULT_DROPDOWN_VALUE = 'Cuisine';

// Sets the cuisineType global and changes the dropdown button text to match
var setCuisineType = (function(cType){
  cuisineType = cType;
  cuisineBtnEl.innerText = cType;
});

//Display recipe in modal
var fillRecipeModal = function(ind = 0) {
  ind = cRecipeInd + ind;
  cRecipeInd = ind;
  // Clears the current modal contents
  modalImgContEl.innerHTML = "";
  modalIngLEl.innerHTML = "";
  cautionsContEl.innerHTML = "";
  // If the requested index is outside the length of recipe hits reset to the first entry
  if (ind >= recipeData.hits.length){
    ind = 0;
    cRecipeInd = 0;
  };
  // Set the Modal's title to the recipe label
  modalTitleEl.innerText = recipeData.hits[ind].recipe.label;
  // Create and attach the recipe's image to the modal
  var modalImageEl = document.createElement("img");
  modalImageEl.setAttribute("src", recipeData.hits[ind].recipe.image);
  modalImgContEl.appendChild(modalImageEl);
  // Run through the cautions array, create list item elements for each and append them to the ul container in the modal
  for(i = 0; i < recipeData.hits[ind].recipe.cautions.length; i++) {
    var cautionsLineEl = document.createElement("li");
    cautionsLineEl.classList = "recipe-cautions text-danger";
    cautionsLineEl.innerText = recipeData.hits[ind].recipe.cautions[i];
    cautionsContEl.appendChild(cautionsLineEl);
  }
  // Run through the ingredientLines array, create list item elements for each and append them to the ul container in the modal
  for(i = 0; i < recipeData.hits[ind].recipe.ingredientLines.length; i++){
    var ingredientLineEl = document.createElement("li");
    ingredientLineEl.classList = "ingredient-lines";
    ingredientLineEl.innerText = recipeData.hits[ind].recipe.ingredientLines[i];
    modalIngLEl.appendChild(ingredientLineEl);
  };
};

// Dynamically populate the cuisineType dropdown menu with available options from the array when the page loads
for(i = 0; i < cuisineTypeArr.length; i++){
  var cListItem = document.createElement("li");
  var cListItemA = document.createElement("a");
  cListItem.classList = "dropdown-item";
  cListItemA.setAttribute = ("href", "#");
  cListItemA.innerText = cuisineTypeArr[i];
  cListItem.appendChild(cListItemA);
  cuisineDDEl.appendChild(cListItem);
  // Listen for a list item being clicked and unhide the buttons when one is, add the animate.style classes to have them animate into the frame.
  cListItem.addEventListener("click", function() {setCuisineType(this.innerText)
    searchButton.classList.remove('hide');
    searchDrink.classList.remove('hide');
    searchButton.classList.add('animate__animated', 'animate__bounceInLeft');
    searchDrink.classList.add('animate__animated', 'animate__bounceInRight');
  });
};


// clicking next on the modal calls the fillRecipeModal function with an arugment of "1", which will increment the currently viewed index
modalNextBtn.addEventListener("click", function(){
  fillRecipeModal(1);
});

//clicking select on the modal fills the selectedRecipeData global var with the object found in recipeData.hits[rRecipeInd]
modalSelectBtn.addEventListener("click", function(){
  selectedRecipeData = recipeData.hits[cRecipeInd];
  // This function creates a card with selected recipe information and appends it below the meal button
  fillRecipeCardEl();
  saveRecipes();
});

//function for filling the recipe card container
var fillRecipeCardEl = function() {
  //clear current card
  recipeCardContEl.innerHTML = "";
  //create new card
  var recipeCardEl = document.createElement("div");
  recipeCardEl.classList = "card animate__animated animate__backInLeft";
  recipeCardEl.setAttribute("style", "width:22rem;")
  //create image, assign src and attach to the card
  var recipeCardImgEl = document.createElement("img");
  recipeCardImgEl.setAttribute("src", selectedRecipeData.recipe.image);
  recipeCardImgEl.classList = "card-img-top";
  recipeCardEl.appendChild(recipeCardImgEl);
  //create card body and attach to the card under the image
  var recipeCardBodyEl = document.createElement("div");
  recipeCardBodyEl.classList = "card-body";
  recipeCardEl.appendChild(recipeCardBodyEl);
  //create title and attach to the body of the card
  var recipeTitleEl = document.createElement("H5");
  recipeTitleEl.classList = "card-subtitle fs-6";
  recipeTitleEl.innerText = selectedRecipeData.recipe.label;
  recipeCardBodyEl.appendChild(recipeTitleEl);
  //create ingredient list and append to the body
  var recipeCardIngContEl = document.createElement("ul");
  recipeCardIngContEl.classList = "card-text";
  recipeCardBodyEl.appendChild(recipeCardIngContEl);
  for (i = 0; i < selectedRecipeData.recipe.ingredientLines.length; i++){
    var newLine = document.createElement("li");
    newLine.innerText = selectedRecipeData.recipe.ingredientLines[i];
    recipeCardIngContEl.appendChild(newLine);
  }
  var goToRecipeBtn = document.createElement("button");
  goToRecipeBtn.classList = "btn btn-success";
  goToRecipeBtn.innerText = "Go To Recipe";
  recipeCardBodyEl.appendChild(goToRecipeBtn);
  goToRecipeBtn.addEventListener("click", function(){
    open(selectedRecipeData.recipe.url);
  })
  //append card to container
  recipeCardContEl.appendChild(recipeCardEl);
};

var badResponseModal = function(){
  modalTitleEl.innerText = "Recipe search is unavailable, please try again later.";
};

// Cocktail API gives ingredients back in indivual named variables with unfilled ingredients as null, this function pushes all the strings into an array and filters out null entries
// for ease of use
var setCocktailIngredients = function() {
  currentCocktailIngredients = [];
  currentCocktailIngredients.push(cocktailData.drinks[0].strIngredient1);
  currentCocktailIngredients.push(cocktailData.drinks[0].strIngredient2);
  currentCocktailIngredients.push(cocktailData.drinks[0].strIngredient3);
  currentCocktailIngredients.push(cocktailData.drinks[0].strIngredient4);
  currentCocktailIngredients.push(cocktailData.drinks[0].strIngredient5);
  currentCocktailIngredients.push(cocktailData.drinks[0].strIngredient6);
  currentCocktailIngredients.push(cocktailData.drinks[0].strIngredient7);
  currentCocktailIngredients.push(cocktailData.drinks[0].strIngredient8);
  currentCocktailIngredients.push(cocktailData.drinks[0].strIngredient9);
  currentCocktailIngredients.push(cocktailData.drinks[0].strIngredient10);
  currentCocktailIngredients.push(cocktailData.drinks[0].strIngredient11);
  currentCocktailIngredients.push(cocktailData.drinks[0].strIngredient12);
  currentCocktailIngredients.push(cocktailData.drinks[0].strIngredient13);
  currentCocktailIngredients.push(cocktailData.drinks[0].strIngredient14);
  currentCocktailIngredients.push(cocktailData.drinks[0].strIngredient15);
  currentCocktailIngredients = currentCocktailIngredients.filter(function(n){return n;});
};

// Function for filling the cocktail card
var fillCocktailCard = function() {
  // Clear the card container HTML
  cocktailCardContEl.innerHTML = "";
  // Create the card div
  var cocktailCardEl = document.createElement("div");
  cocktailCardEl.classList = "card animate__animated animate__backInLeft";
  cocktailCardEl.setAttribute("style", "width:22rem;")
  // Create the card img element and append to the card
  var cocktailCardImgEl = document.createElement("img"); 
  cocktailCardImgEl.setAttribute("src", cocktailData.drinks[0].strDrinkThumb); 
  cocktailCardImgEl.classList = "card-img-top"; 
  cocktailCardEl.appendChild(cocktailCardImgEl); 
  // Create the card body and append to the card
  var cocktailCardBodyEl = document.createElement("div"); 
  cocktailCardBodyEl.classList = "card-body"; 
  cocktailCardEl.appendChild(cocktailCardBodyEl); 
  // Create the cocktail title and append to the body
  var cocktailTitleEl = document.createElement("H5"); 
  cocktailTitleEl.classList = "card-subtitle fs-6"; 
  cocktailTitleEl.innerText = cocktailData.drinks[0].strDrink; 
  cocktailCardBodyEl.appendChild(cocktailTitleEl); 
  // Create the ingredients list container and append to body
  var cocktailCardIngContEl = document.createElement("ul"); 
  cocktailCardIngContEl.classList = "card-text"; 
  cocktailCardBodyEl.appendChild(cocktailCardIngContEl); 
  // For each ingredient in the array create a list item and append it to the container
  for (i = 0; i < currentCocktailIngredients.length; i++){
    var newLine = document.createElement("li"); 
    newLine.innerText = currentCocktailIngredients[i]; 
    cocktailCardIngContEl.appendChild(newLine); 
  }
  // Append the completed card to the card container element
  cocktailCardContEl.appendChild(cocktailCardEl); 

  //set the directions for making the cocktail at the bottom and unhides the div
  resultCocktailDirectionsel.innerText = cocktailData.drinks[0].strInstructions;
  resultSection.classList.remove('hide');
};

var saveRecipes = function(){
  localStorage.setItem("mealRecipe", JSON.stringify(selectedRecipeData));
  localStorage.setItem("cocktailRecipe", JSON.stringify(cocktailData));
};

var getRecipes = function(){
  selectedRecipeData = JSON.parse(localStorage.getItem("mealRecipe"));
  cocktailData = JSON.parse(localStorage.getItem("cocktailRecipe"));
};

if ((!selectedRecipeData != undefined) || (!cocktailData != undefined)){
  getRecipes();
  console.log("saved info present");
  fillCocktailCard();
  fillRecipeCardEl();
};