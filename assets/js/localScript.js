// JS 1
console.log('Restaurant and Recipe Finder');

//edamam key e33914458ccf91189cbbbdaf6ce48cb1
//edam appID = 
//cuisineType string = American

//yelp key ZSIbD5jFeD6c_628etU8NCdij_rdPwEjnUK727r4X6NMlwwtXthkYWT3DBbOyvKI-0fa-19bPMSrIW5i6KYuORHeyHRpVDeHcoD1CKRwZnYMbHR_JJIO2GFknorCYXYx
// yelp parameters (restaurants, cuisineType)

// https://api.yelp.com/v3/businesses/search?&location=toronto
// 43.696652, -79.349543

// Edamam

var recipe = function() {
    fetch("https://api.edamam.com/api/recipes/v2?type=public&q=American&app_id=82446414&app_key=e33914458ccf91189cbbbdaf6ce48cb1&cuisineType=American")
    .then(response => response.json())
    .then(response => console.log(response))
}

var restaurants = function() {
    fetch("https://api.yelp.com/v3/businesses/search?location=toronto", {
        headers: {
            "Authorization": "Bearer ZSIbD5jFeD6c_628etU8NCdij_rdPwEjnUK727r4X6NMlwwtXthkYWT3DBbOyvKI-0fa-19bPMSrIW5i6KYuORHeyHRpVDeHcoD1CKRwZnYMbHR_JJIO2GFknorCYXYx",
            "Access-Control-Allow-Origin":"*" 
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
}

var URL = 'https://api.yelp.com/v3/businesses/search?location=40515&term&categories=vet&limit=10';

var API_KEY = 'ZSIbD5jFeD6c_628etU8NCdij_rdPwEjnUK727r4X6NMlwwtXthkYWT3DBbOyvKI-0fa-19bPMSrIW5i6KYuORHeyHRpVDeHcoD1CKRwZnYMbHR_JJIO2GFknorCYXYx';

var req = { 'Content-Type' : 'image/jpeg', 'X-My-Custom-Header' : 'Zeke are cool' };

restaurants();




// Yelp











// JS 2
