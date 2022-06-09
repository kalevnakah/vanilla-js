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

//Fetch meal by ID
function getFoodByNumber(foodID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodID}`)
    .then((res) => res.json())
    .then((data) => {
      const food = data.meals[0];

      addFoodToDOM(food);
      console.log(food);
    });
}

//Fetch random meal
function mixerFood() {
  //Clear Meals and Heading
  foodEl.innerHTML = '';
  resultTitleEl.innerHTML = '';

  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((data) => {
      const food = data.meals[0];

      addFoodToDOM(food);
    });
}

//Add meal to DOM
function addFoodToDOM(food) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (food[`strIngredient${i}`]) {
      ingredients.push(
        `${food[`strIngredient${i}`]} - ${food[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleFoodEl.innerHTML = `
    <div class="main-meal">
      <h1>${food.strMeal}</h1>
      <img src="${food.strMealThumb}" alt="${food.strMeal}" />
      <div class="main-meal-info">
        ${food.strCategory ? `<p>${food.strCategory}<p>` : ''}
        ${food.strArea ? `<p>${food.strArea}<p>` : ''}
        </div>
        <div class="main">
          <p>${food.strInstructions}</p>
          <h2>Ingredients</h2>
          <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
          </ul>
        </div>
    </div>
  `;
}

//Event listener
sendEl.addEventListener('submit', findFood);
mixerEl.addEventListener('click', mixerFood);

foodEl.addEventListener('click', (e) => {
  const foodInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('food-info');
    } else {
      return false;
    }
  });
  if (foodInfo) {
    const foodId = foodInfo.getAttribute('data-foodID');
    getFoodByNumber(foodId);
  }
});
