let table = document.querySelector("table");
let tick = document.querySelector("#tick"), cross = document.querySelector("#cross");
let counter = 0;

class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

let prodName = document.querySelector("#name"), price = document.querySelector("#price"), quantity = document.querySelector("#quantity");

let errorForName = document.querySelector("#error-for-product"), errorForPrice = document.querySelector("#error-for-price"), errorForQuantity = document.querySelector("#error-for-quantity");

prodName.addEventListener("blur", () => {
  if (prodName.value === "" || prodName.value === " ") {
    errorForName.style.display = "block";
  }
  errorForName.style.display = "";
  tick.style.display = "";
  cross.style.display = "";
});
prodName.addEventListener("focus", () => {
  errorForName.style.display = "";
});

price.addEventListener("blur", () => {
  if (price.value === "" || price.value === " " || isNaN(price.value))
    errorForPrice.style.display = "block";
});
price.addEventListener("focus", () => {
  errorForPrice.style.display = "";
});

quantity.addEventListener("blur", () => {
  if (quantity.value === "" || quantity.value === " " || isNaN(quantity.value))
    errorForQuantity.style.display = "block";
});
quantity.addEventListener("focus", () => {
  errorForQuantity.style.display = "";
});

function duplicateCheckForName(val) {
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].name === val) {
      console.log(inventory[i].name + " = " + val);
      tick.style.display = "";
      cross.style.display = "block";
      errorForName.style.display = "block";
      break;
    } else if (val === "" || val === " ") {
      tick.style.display = "";
      cross.style.display = "";
    } else {
      tick.style.display = "block";
      cross.style.display = "";
    }
  }
}

var inventory = [];

function formSubmit(e) {

  e.preventDefault();

  let obj = new Product(prodName.value, price.value, quantity.value);
  let tr = document.createElement("tr"), del = document.createElement("button"), edit = document.createElement("button");
  let tData = "", localCounter = 1;

  inventory[counter] = obj;

  del.id = "del";
  del.innerHTML = '<i class="fa-solid fa-trash"></i>';
  
  edit.innerHTML = '<i class="fa-solid fa-pen"></i>';
  edit.id = "edit";
  edit.setAttribute("valueInTheRow", counter);

  Object.values(obj).map((val) => {
    if (localCounter === 2) tData += `<td id="two">$${val}</td>`;
    else tData += `<td>${val}</td>`;
    localCounter++;
  });

  del.addEventListener("click", () => {
    inventory.splice(tr.rowIndex - 1, 1);
    table.removeChild(tr);
    counter--;
    console.log(inventory);
  });

  tr.innerHTML += tData;

  tr.append(edit);
  tr.append(del);
  tr.setAttribute("valueInTheRow", counter);
  table.append(tr);

  counter++;

  e.target.reset();

  let submit = document.getElementById("submit");
  let updateAndSave = document.querySelector(".updateAndSave") , update = document.querySelector("#update");
  
  edit.addEventListener("focus", () => {
    submit.style.display = "none";
    updateAndSave.style.display = "flex";
    
    let n = tr.getAttribute("valueInTheRow");

    prodName.value = inventory[n].name;
    price.value = inventory[n].price;
    quantity.value = inventory[n].quantity;

    update.addEventListener("click", () => {
      inventory[n].name = prodName.value;
      inventory[n].price = price.value;
      inventory[n].quantity = quantity.value;

      tData = "";
      tData += `<td>${inventory[n].name}</td>`;
      tData += `<td>$${inventory[n].price}</td>`;
      tData += `<td>${inventory[n].quantity}</td>`;

      tr.innerHTML = tData;

      tr.append(edit);
      tr.append(del);
      table.append();

    });

    document.querySelector("#save").addEventListener("click", () => {
      e.target.reset();
      submit.style.display = "block";
      updateAndSave.style.display = "";
    });

  });
}
