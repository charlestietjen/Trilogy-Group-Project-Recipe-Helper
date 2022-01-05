let searchButton = document.querySelector("#recipes")
let searchDrink = document.querySelector("#cocktail")
var cuisineType = "";
searchButton.addEventListener("click", () => {
  console.log('recipe pressed')
  sendApiRequest()
})

searchDrink.addEventListener("click", () => {
  console.log('drink pressed')
  sendApiRequest2()
})
// JS 1

async function sendApiRequest(){
  let APP_ID = "8ad7c3e9"
  let APP_KEY = "bf56552f866dd3ccad5d1f970588ac81"
  let TYPE = cuisineType
  let response = await fetch ('https://api.edamam.com/api/recipes/v2?type=public&app_id=' + APP_ID + '&app_key=' + APP_KEY + '&random=true&cuisineType=' + TYPE)
  console.log(response)
  let data = await response.json()
  console.log(data)
  useApiData(data)
}

function useApiData(data){
  document.querySelector('#content').innerHTML = `
  <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${data.hits[5].recipe.image}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${data.hits[0].recipe.label}</h5>
    <p class="card-text">Ingredients: ${data.hits[0].recipe.ingredientLines}</p>
    <a href="${data.hits[0].recipe.url}" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
  `
}



console.log('Restaurant and Recipe Finder');


// cocktail recipe 

async function sendApiRequest2() {
  let API_KEY = "1"
  let response = await fetch ('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  console.log(response)
  let data2 = await response.json()
  console.log(data2)
  useApiData2(data2)
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
var cuisineTypeArr = ["American", "Asian", "Caribbean", "Central Europe", "Chinese", "Eastern Europe", "French", "Indian", "Japanese", "Mexican", "Middle Eastern", "South American", "South East Asian"];
var cuisineDDEl = document.querySelector("#cuisine-container");
var cuisineBtnEl = document.querySelector("#cuisine");
// Default dropdown value
const DEFAULT_DROPDOWN_VALUE = 'Cuisine';

var setCuisineType = (function(cType){
  cuisineType = cType;
  cuisineBtnEl.innerText = cType;
  console.log(cType);
});

// Display selected item from dropdown
$('.dropdown-menu li a').click(function () {
    $('#cuisine').html($(this).text());
    console.log(this)
    cuisineType = $(this).text();
});

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