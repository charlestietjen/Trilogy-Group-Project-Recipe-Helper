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
var cRecipeInd = 0;


searchButton.addEventListener("click", () => {
  //console.log('recipe pressed')
  sendApiRequest()
})

searchDrink.addEventListener("click", () => {
  //console.log('drink pressed')
  sendApiRequest2()
})
// JS 1

async function sendApiRequest(){
  let APP_ID = "8ad7c3e9"
  let APP_KEY = "bf56552f866dd3ccad5d1f970588ac81"
  let TYPE = cuisineType
  let response = await fetch ('https://api.edamam.com/api/recipes/v2?type=public&app_id=' + APP_ID + '&app_key=' + APP_KEY + '&random=true&dishType=Main%20course&cuisineType=' + TYPE)
  //console.log(response)
  let data = await response.json()
  //console.log(data)
  recipeData = data;
  fillRecipeModal(0);
  //console.log(recipeData);
  //useApiData(data)
}

//function useApiData(data){
//  document.querySelector('#content').innerHTML = `
//  <div class="card" style="width: 18rem;">
//  <img class="card-img-top" src="${data.hits[5].recipe.image}" alt="Card image cap">
//  <div class="card-body">
//    <h5 class="card-title">${data.hits[0].recipe.label}</h5>
//    <p class="card-text">Ingredients: ${data.hits[0].recipe.ingredientLines}</p>
//    <a href="${data.hits[0].recipe.url}" class="btn btn-primary">Go somewhere</a>
//  </div>
//</div>
//  `
//}



//console.log('Restaurant and Recipe Finder');


// cocktail recipe 

async function sendApiRequest2() {
  let API_KEY = "1"
  let response = await fetch ('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  //console.log(response)
  let data2 = await response.json()
  cocktailData = data2;
  console.log(cocktailData);
  //useApiData2(data2)
}

function useApiData2(data2){
  document.querySelector('#cocktail').innerHTML = `
  <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${data2.drinks[0].strDrinkThumb}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${data2.drinks[0].strDrink}</h5>
    <p class="card-text">Ingredients: ${data2.drinks[0].strInstructions}</p>
    <a href="${data2.drinks[0].strDrinkThumb}" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
  `
}














//Page logic
// Default dropdown value
const DEFAULT_DROPDOWN_VALUE = 'Cuisine';

var setCuisineType = (function(cType){
  cuisineType = cType;
  cuisineBtnEl.innerText = cType;
});
// I think I broke this function that uses jquery when i reassigned id's to tie the two halves of the script together but i also think i rewrote what it does in native js. ¯\_(ツ)_/¯ - Charles
// Display selected item from dropdown
//$('.dropdown-menu li a').click(function () {
//    $('#cuisine').html($(this).text());
//    console.log(this)
//    console.log("the jquery function went off, what did it do???")
//    cuisineType = $(this).text();
//});

//Display recipe in modal
var fillRecipeModal = function(ind = 0) {
  //console.log(recipe);
  ind = cRecipeInd + ind;
  cRecipeInd = ind;
  modalImgContEl.innerHTML = "";
  modalIngLEl.innerHTML = "";
  cautionsContEl.innerHTML = "";
  if (ind >= recipeData.hits.length){
    ind = 0;
    cRecipeInd = 0;
  };
  modalTitleEl.innerText = recipeData.hits[ind].recipe.label;
  var modalImageEl = document.createElement("img");
  modalImageEl.setAttribute("src", recipeData.hits[ind].recipe.image);
  modalImgContEl.appendChild(modalImageEl);
  for(i = 0; i < recipeData.hits[ind].recipe.cautions.length; i++) {
    var cautionsLineEl = document.createElement("li");
    cautionsLineEl.classList = "recipe-cautions text-danger";
    cautionsLineEl.innerText = recipeData.hits[ind].recipe.cautions[i];
    cautionsContEl.appendChild(cautionsLineEl);
  }
  for(i = 0; i < recipeData.hits[ind].recipe.ingredientLines.length; i++){
    var ingredientLineEl = document.createElement("li");
    ingredientLineEl.classList = "ingredient-lines";
    ingredientLineEl.innerText = recipeData.hits[ind].recipe.ingredientLines[i];
    modalIngLEl.appendChild(ingredientLineEl);
  };
};

// Hide search section and show result
const smashBtn = document.querySelector('#smash');
const cuisineContainer = document.querySelector('#cuisineContainer');
smashBtn.addEventListener('click', function (event) {
    cuisineContainer.classList.add('hide');
    resultSection.classList.remove('hide');
    document.querySelector('#cuisine').textContent = DEFAULT_DROPDOWN_VALUE;
});

// Show search section and hide result
const resultSection = document.querySelector('#result');
const goHomeBtn = document.querySelector('#gohome');
goHomeBtn.addEventListener('click', function (event) {
    cuisineContainer.classList.remove('hide');
    resultSection.classList.add('hide');
});

// Dynamically populate the cuisineType dropdown menu with available options from the array
for(i = 0; i < cuisineTypeArr.length; i++){
  var cListItem = document.createElement("li");
  var cListItemA = document.createElement("a");
  cListItem.classList = "dropdown-item";
  cListItemA.setAttribute = ("href", "#");
  cListItemA.innerText = cuisineTypeArr[i];
  cListItem.appendChild(cListItemA);
  cuisineDDEl.appendChild(cListItem);
  cListItemA.addEventListener("click", function() {setCuisineType(this.innerText)});
};


// clicking next on the modal calls the fillRecipeModal function with an arugment of "1", which will increment the currently viewed index
modalNextBtn.addEventListener("click", function(){
  fillRecipeModal(1);
});

//clicking select on the modal fills the selectedRecipeData global var with the object found in recipeData.hits[rRecipeInd]
modalSelectBtn.addEventListener("click", function(){
  selectedRecipeData = recipeData.hits[cRecipeInd];
  fillRecipeCardEl();
});

//function for filling the recipe card container
var fillRecipeCardEl = function() {
  //clear current card
  recipeCardContEl.innerHTML = "";
  //create new card
  var recipeCardEl = document.createElement("div");
  recipeCardEl.classList = "card animate__animated animate__backInDown";
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


  //append card to container
  recipeCardContEl.appendChild(recipeCardEl);
}