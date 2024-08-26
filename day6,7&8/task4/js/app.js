let form = document.querySelector("form"), table = document.querySelector("table"), counter = 0;

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
  if (prodName.value === "" || prodName.value === " ")
    errorForName.style.display = "block";
});
prodName.addEventListener("focus", () => {
  errorForPrice.style.display = "";
});

price.addEventListener("blur", () => {
  if (price.value === "" || price.value === " " || isNaN(price.value))
    errorForPrice.style.display = "block";
});
price.addEventListener("focus", () => {
  errorForPrice.style.display = "";
});

quantity.addEventListener("blur", () => {
  if ( quantity.value === "" || quantity.value === " " || isNaN(quantity.value))
    errorForQuantity.style.display = "block";
});
quantity.addEventListener("focus", () => {
  errorForQuantity.style.display = "";
});

let inventory = [];

form.addEventListener("submit", (e) => {
  //This is to prevent the default action performed by the form (refreshing)
  e.preventDefault();
  //This is  to add the input field values into class and creating it as new object and storing it the obj variable
  let obj = new Product(prodName.value, price.value, quantity.value);

  inventory[counter++] = obj;

  let tr = document.createElement("tr"), del = document.createElement("button");
  del.id = "del";
  del.innerHTML = "<i class='fa-solid fa-trash'></i>";

  let tData = "", localCounter = 1, storeQuantity = 0;

  Object.values(obj).map((val) => {
    if (localCounter === 3) {
      tData += `<td><input type="text" id="quantity-updater" value="${val}"></td>`;
      storeQuantity = val;
    }else if (localCounter === 2)
      tData += `<td>$${val}</td>`;
    else 
      tData += `<td>${val}</td>`;
    localCounter++;
  });

  del.addEventListener("click", () => {
    inventory.splice(tr.rowIndex - 1, 1);
    table.removeChild(tr);
    counter--;
    console.log(inventory);
  });

  tr.innerHTML += tData;
  tr.append(del);
  table.append(tr);
  form.reset();

  let update = document.querySelectorAll("#quantity-updater");
  update.forEach((i) => {
    i.addEventListener("blur", () => {
      if (i.value === "")
        i.value = storeQuantity;
      else
        storeQuantity = i.value;
    });
  });
});
