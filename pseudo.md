## User story for clarity

- Page loads
- User enters a cuisine category into the form field
    - The form field assists the user by autocompleting to valid entries
- User clicks on the meal button
    - API call fills an array w/meal objects of the chosen cuisine from edamam
    - A modal is presented to the user with information about a recipe
    - The user may click "next" to view the next index in the array
    - Clicking "Select" locks in the currently viewed recipe
    - The modal closes on clicking "Select" or clicking outside the modal
- User clicks on the cocktail button
    - API call fills an array w/drink items
    - Second API call to grab the first index in the array
    - A modal is presented with information grabbed in the second call
    - The user may click "next" to view the next index in the array
    - Each next will require a new API call
    - Clicking select locks in the currently viewed recipe
    - The modal closes on clicking "Select" or clicking outside the modal
- User clicks the "Smash"/"Combine"/"Submit" button
    - The user is taken to a new page, or we clear the current page
    - We combine the two ingredient lists, if possible we combine ingredients that are the same
    - We display the two directions side by side (if this doesn't look good we adjust)

    ## A quick legend for the useful information in each recipe object since each one comes with a lot of information.

    ### Edamam

    This get url allows us to grab 20 recipes for dinners, full meals so we avoid drinks where we can sub in the entered cuisineType to narrow the results. We pass a blank string " " in the usually required query text to skip that part of the query, cause we're sneaky.

    'https://api.edamam.com/api/recipes/v2?type=public&q=%22%20%22&app_id=82446414&app_key=' + apiKey + '&cuisineType=' + cuisineType +  '&mealType=Dinner&dishType=Main%20course'


    history.recipe[i]
        .image (string)
        .images[i]
            .THUMBNAIL (string)
            .SMALL (string) 
            .REGULAR (string)
            .LARGE  (string)
        .url (string, url to original recipe page)
        .yield (int)
        .dietLabels[i]
            .Balanced (string)
        .healthLabels[i] (too many to be worth using)
        .cautions[i] (strings)
        .ingredientLines[i] (ingredients split into an array of short lines)
        .ingredients[i] (array of objects containing the following items)
            .text (string)
            .quantity (int)
            .measure (string)
            .food  (string)
            .weight (int)
            .foodCategory (string)
            .foodId (string)
            .image  (url as string)
        .calories (float)
        .totalWeight (float)
        .totalTime (int)
        .cuisineType (string)
        .mealType (string)
        .dishType (string)

The rest of the information is very detailed nutrition we don't really need. approx 700 lines per recipe.

### cocktailDB

Brings up an array of alcoholic drinks with name (strDrink), thumbnail url (strDrinkThumb) and id (idDrink) all as strings.

https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic

Looks up a drink by id and returns all information about the item.

https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

drinks
    "idDrink": "11007",
    "strDrink": "Margarita",
    "strDrinkAlternate": null,
    "strTags": "IBA,ContemporaryClassic",
    "strVideo": null,
    "strCategory": "Ordinary Drink",
    "strIBA": "Contemporary Classics",
    "strAlcoholic": "Alcoholic",
    "strGlass": "Cocktail glass",
    "strInstructions": "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
    "strInstructionsES": null,
    "strInstructionsDE": "Reiben Sie den Rand des Glases mit der Limettenscheibe, damit das Salz daran haftet. Achten Sie darauf, dass nur der äußere Rand angefeuchtet wird und streuen Sie das Salz darauf. Das Salz sollte sich auf den Lippen des Genießers befinden und niemals in den Cocktail einmischen. Die anderen Zutaten mit Eis schütteln und vorsichtig in das Glas geben.",
    "strInstructionsFR": null,
    "strInstructionsIT": "Strofina il bordo del bicchiere con la fetta di lime per far aderire il sale.\r\nAvere cura di inumidire solo il bordo esterno e cospargere di sale.\r\nIl sale dovrebbe presentarsi alle labbra del bevitore e non mescolarsi mai al cocktail.\r\nShakerare gli altri ingredienti con ghiaccio, quindi versarli delicatamente nel bicchiere",
    "strInstructionsZH-HANS": null,
    "strInstructionsZH-HANT": null,
    "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    "strIngredient1": "Tequila",
    "strIngredient2": "Triple sec",
    "strIngredient3": "Lime juice",
    "strIngredient4": "Salt",
    "strIngredient5": null,
    "strIngredient6": null,
    "strIngredient7": null,
    "strIngredient8": null,
    "strIngredient9": null,
    "strIngredient10": null,
    "strIngredient11": null,
    "strIngredient12": null,
    "strIngredient13": null,
    "strIngredient14": null,
    "strIngredient15": null,
    "strMeasure1": "1 1/2 oz ",
    "strMeasure2": "1/2 oz ",
    "strMeasure3": "1 oz ",
    "strMeasure4": null,
    "strMeasure5": null,
    "strMeasure6": null,
    "strMeasure7": null,
    "strMeasure8": null,
    "strMeasure9": null,
    "strMeasure10": null,
    "strMeasure11": null,
    "strMeasure12": null,
    "strMeasure13": null,
    "strMeasure14": null,
    "strMeasure15": null,
    "strImageSource": "https://commons.wikimedia.org/wiki/File:Klassiche_Margarita.jpg",
    "strImageAttribution": "Cocktailmarler",
    "strCreativeCommonsConfirmed": "Yes",
    "dateModified": "2015-08-18 14:42:59"