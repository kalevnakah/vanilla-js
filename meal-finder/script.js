const findEl = document.getElementById('find'),
  sendEl = document.getElementById('send'),
  mixerEl = document.getElementById('mixer'),
  foodEl = document.getElementById('food'),
  resultTitleEl = document.getElementById('result-title'),
  singleFoodEl = document.getElementById('one-meal');

//search mea and fetch from API
function findFood(e) {
  e.preventDefault();

  //clear single meal
  singleFoodEl.innerHTML = '';

  //Get search term
  const search = findEl.value;

  // Check for empty
  if (search.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultTitleEl.innerHTML = `<h2>Search results for '${search}':</h2>`;

        if (data.meals === null) {
          resultTitleEl.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          foodEl.innerHTML = data.meals
            .map(
              (meal) => `
              <div class="ameal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="food-info" data-foodID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
            `
            )
            .join('');
        }
      });
    //clear search text
    findEl.value = '';
  } else {
    alert('Please enter a search term.');
  }
}

//Event listener
sendEl.addEventListener('submit', findFood);
