const mainContainer = document.querySelector(".mainContainer");
const cartBody = document.querySelector(".cartBody");
const searchBtn = document.querySelector(".searchBtn");

fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
    .then(res => res.json())
    .then(data => {
        main(data.drinks);
        searchBtn.addEventListener("click", () => {
            const searchBar = document.querySelector(".searchBar");
            const asked=searchBar.value.trim().toLowerCase();
            const newData=data.drinks.filter(drink=>drink.strDrink.toLowerCase().includes(asked));
            mainContainer.innerHTML="";
            main(newData);
        });
    })

const main = (data) => {
    if(data.length===0){
        mainContainer.html="";
        const p=document.createElement("p");
        p.innerText="No Drinks Found";
        p.classList.add("fw-bold","mt-5","text-center");
        mainContainer.appendChild(p);
        return;
    }
    data.forEach((drink) => {
        mainContainer.html="";
        const div = document.createElement("div");

        div.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");
        div.innerHTML = `<div class="card h-100">
  <img src=${drink.strDrinkThumb} class="card-img-top img-fluid" alt="...">
  <div class="card-body">
    <h6 class="card-title">${drink.strDrink}</h6>
    <h6 class="card-subtitle"><span class="fw-bold">Category: </span>${drink.strCategory}</h6>
    <p class="card-text"><span class="fw-bold">Instructions:</span> ${drink.strInstructions.slice(0, 15)}...</p>
    <div class="d-flex justify-content-between">
    
    <button class="btn btn-primary cartBtn">Add to Cart</button>
    
    <button class="btn btn-primary detailsBtn">Details</button>
    </div>
  </div>
</div>`;
        mainContainer.appendChild(div);

        const cartBtn = div.querySelector(".cartBtn");
        cartBtn.addEventListener("click", () => {

            const count = document.querySelector(".count");
            if (Number(count.innerText) === 7) {
                alert("Already 7 items added.");
                return;
            }
            cart(drink);
            cartBtn.disabled = true;
            cartBtn.innerText = "Added";
        });

        const detailsBtn = div.querySelector(".detailsBtn");
        detailsBtn.addEventListener("click", () => modalOpen(drink));
    })
}

const cart = (newRow) => {
    const count = document.querySelector(".count");
    const row = document.createElement("tr");

    let current = Number(count.innerText) + 1;
    count.innerText = current.toString();
    row.innerHTML = `
        <th scope="row">${count.innerText}</th>
            <td class="w-50 h-50 rounded"><img src=${newRow.strDrinkThumb} class="img-fluid"/></td>
        <td>${newRow.strDrink}</td>
    `;

    cartBody.appendChild(row);
}


const modalOpen = (drink) => {
    const oldModal = document.getElementById("drinkModal");
    if (oldModal)
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

