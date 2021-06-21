'use strict';
let parentForm = document.getElementById('form');
let divTable = document.getElementById('tableContainer');
let parentTable = document.getElementById('table');
divTable.appendChild(parentTable);
console.log(parentTable);
let total = 0;
// We can add price in the array
let tableHeaderContent = [' Item Name ', ' Category ', ' Quantity ', ' Price '];
let wishlistArr = [];
function Wishlist(itemName, category, quantity) {
    this.itemName = itemName;
    this.category = category;
    this.quantity = quantity;
    this.price = generateRandomPrice(quantity);
    wishlistArr.push(this);
}
let form = document.getElementById('form');
form.addEventListener('submit', formHandler);

function formHandler(event) {
    event.preventDefault();

    let name = event.target.itemName.value;
    let category = event.target.category.value;
    let quantity = event.target.quantity.value;

    let newItem = new Wishlist(name, category, quantity);
    newItem.render();
    localStorage.setItem('productList', JSON.stringify(wishlistArr));
}


function header() {
    let tr = document.createElement('tr');
    parentTable.append(tr);
    for (let i = 0; i < tableHeaderContent.length; i++) {
        let th = document.createElement('th');
        tr.append(th);
        th.textContent = tableHeaderContent[i];
    }

}
Wishlist.prototype.render = function () {
    let tr = document.createElement('tr');
    parentTable.appendChild(tr);

    let tdName = document.createElement('td');
    tr.appendChild(tdName);
    tdName.textContent = this.itemName;

    let tdCategory = document.createElement('td');
    tr.appendChild(tdCategory);
    tdCategory.textContent = this.category;

    let tdQuantity = document.createElement('td');
    tr.appendChild(tdQuantity);
    tdQuantity.textContent = this.quantity;

    let tdPrice = document.createElement('td');
    tr.appendChild(tdPrice);
    tdPrice.textContent = this.price;

    let tdDelete = document.createElement('td');
    tr.appendChild(tdDelete);
    tdDelete.textContent = 'Delete';

    tdDelete.addEventListener('click', deleteData);
}

function CheckingLocalStorage() {
    if (localStorage.getItem('productList')) {
        wishlistArr = JSON.parse(localStorage.getItem('productList'));
        renderAfterStoring();
    }
}

function renderAfterStoring() {
    for (let i = 0; i < wishlistArr.length; i++) {
        let tr = document.createElement('tr');
        parentTable.appendChild(tr);

        let tdName = document.createElement('td');
        tr.appendChild(tdName);
        tdName.textContent = wishlistArr[i].itemName;

        let tdCategory = document.createElement('td');
        tr.appendChild(tdCategory);
        tdCategory.textContent = wishlistArr[i].category;

        let tdQuantity = document.createElement('td');
        tr.appendChild(tdQuantity);
        tdQuantity.textContent = wishlistArr[i].quantity;

        let tdPrice = document.createElement('td');
        tr.appendChild(tdPrice);
        tdPrice.textContent = wishlistArr[i].price;

        let tdDelete = document.createElement('td');
        tr.appendChild(tdDelete);
        tdDelete.textContent = 'Delete';

        tdDelete.addEventListener('click', deleteData);

        // let p = document.getElementById('p');
        // // divTable.appendChild(p);
        // total = total+wishlistArr[i].price;
        // p.textContent = `$ ${total}`;
    }
}
function generateRandomPrice(quantity) {
    return (Math.floor((Math.random() * 700) + 100))*quantity;
}

// let object = this;
function deleteData() {
    // event.preventDefault();
    // // console.log('hello');
    // // console.log(object);
    // // tr.textContent = '';
    for(let i = 0; i<wishlistArr.length; i++){
        
        // wishlistArr.splice(i, 1);
        parentTable.deleteRow(wishlistArr.splice(i, 1))
        // console.log( wishlistArr.splice(i, 1));
        // if (object.itemName === wishlistArr[i].itemName) {
        // }
    }
    
    }



header();
CheckingLocalStorage();