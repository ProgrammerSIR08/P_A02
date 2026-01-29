fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then(res => res.json())
    .then(data => res(data))

const res = (data) => {
    data.drinks.map((drink) => {
        const div = document.createElement("div");

        div.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");
        div.innerHTML = `<div class="card h-100">
  <img src=${drink.strDrinkThumb} class="card-img-top img-fluid" alt="...">
  <div class="card-body">
    <h6 class="card-title">${drink.strGlass}</h6>
    <h6 class="card-subtitle"><span class="fw-bold">Category: </span>${drink.strCategory}</h6>
    <p class="card-text"><span class="fw-bold">Instructions:</span> ${drink.strInstructions.slice(0, 15)}...</p>
    <div class="d-flex justify-content-between">
    
    <a href="#" class="btn btn-primary">Add to Cart</a>
    
    <button class="btn btn-primary detailsBtn">Details</a>
    </div>
  </div>
</div>`;
        mainContainer.appendChild(div);

        const detailsBtn = div.querySelector(".detailsBtn");
        detailsBtn.addEventListener("click", () => modalOpen(drink));
    })
}

const mainContainer = document.querySelector(".mainContainer");

const modalOpen = (drink) => {
    const oldModal=document.getElementById("drinkModal");
    if(oldModal)
        oldModal.remove();
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="modal" id="drinkModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <img src=${drink.strDrinkThumb} class="card-img-top img-fluid" alt="...">
                </div>
                <div class="modal-body">
                    <h5 class="modal-title mt-2">${drink.strGlass}</h5>
                    
    <h6 class="card-subtitle mt-2"><span class="fw-bold">Category: </span>${drink.strCategory}</h6>
    <p class="card-text mt-2"><span class="fw-bold">Instructions:</span> ${drink.strInstructions}</p>
    <p class="card-text mt-2"><span class="fw-bold">Alcoholic:</span> ${drink.strAlcoholic}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.appendChild(div);

    const modal = new bootstrap.Modal(
        document.getElementById("drinkModal")
    );

    modal.show();
}