
const showAlert = document.getElementById('error')
showAlert.style.display = 'none'

const searchItem = () => {
    const inputValue = document.getElementById('input-value')
    const searchValue = inputValue.value

    if (searchValue == '') {
        showAlert.style.display = 'block'
        showAlert.innerText = 'Please Enter A Valid Keyword'
    } else {
        showAlert.style.display = 'none'
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
        inputValue.value = ''

        fetch(url)
            .then(res => res.json())
            .then(data => loadData(data.meals))
            .catch(err => sendError(err))

    }


}

const sendError = err => {
    showAlert.style.display = 'block'
    showAlert.innerText = 'Please Enter A Valid Keyword'
}


const loadData = (foods) => {
    const foodContainer = document.getElementById('foodContainer')
    foodContainer.textContent = ''

    foods.forEach(food => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
<div onclick="loadDetails(${food.idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="card h-100" >
            <img src="${food.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${food.strMeal}</h5>
              <p class="card-text">${food.strInstructions.slice(0, 150)}</p>
            </div>
        </div>
        
        `
        foodContainer.appendChild(div)
    });
}
const loadDetails = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))
}


const displayMealDetails = meal => {
    const mealDetails = document.getElementById('show-details')
    const div = document.createElement('div')
    div.classList.add('modal-content')
    div.innerHTML = `
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${meal.strMeal}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">

                <div class="card-body">
                <h5 class="card-title">Category: <b>${meal.strCategory}</b></h5>
                  <p class="card-text">${meal.strInstructions.slice(0, 300)}</p>
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary "><a href="${meal.strYoutube}" target="_blank" class="text-white text-decoration-none" rel="noopener noreferrer">Watch</a></button>
                    
                </div>
    `
    mealDetails.appendChild(div)
    console.log(meal)
}
