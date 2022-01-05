// Default dropdown value
const DEFAULT_DROPDOWN_VALUE = 'Cuisine';

// Display selected item from dropdown
$('.dropdown-menu li a').click(function () {
    $('#cuisine').html($(this).text());
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
