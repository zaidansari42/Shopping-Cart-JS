'use strict';
//
// Shopping Cart
const cart = [];

// Creating the Prototype of the product

const Product = function (id, item, price, imgSource, quantity) {
  this.id = id;
  this.item = item;
  this.price = price;
  this.imgSource = imgSource;
  this.quantity = quantity;
};
//

// Creating each product
const apple = new Product('asd5a4wd7', 'Apple', 50, 'Apple.jpeg', 1);
const banana = new Product('foesfkeo', 'Banana', 20, 'Banana.jpeg', 1);
const orange = new Product('ofjeoief', 'Orange', 30, 'Orange.jpeg', 1);
const pear = new Product('woaeiowari', 'Pear', 75, 'Pear.jpeg', 1);

// Total products
const totalItems = [apple, banana, orange, pear];

const shop = document.getElementById('main');

// Shop Generating Function
const generateShop = function () {
  return (shop.innerHTML = totalItems
    .map(function (x) {
      // Destructuring
      let { id, item, price, imgSource, quantity } = x;

      return `<div class="card my-2 mx-2 mx-auto" style="width:15rem">
      <img src="Images/${imgSource}" class="card-img-top" alt="${item}" />
      <div class="card-body text-center ${item}" id="${id}">
        <h5 class="card-title">${item}</h5>
        <p class="card-text fs-5">Price: ₹ <span class="pricing">${price}</span></p>
        <i class="bi bi-dash-lg btn btn-primary col-4 remove"></i>
        <span class="quantity fs-4 px-2">0</span>
        <i class="bi bi-plus-lg btn btn-primary col-4 add"></i>
      </div>
      </div>`;
    })
    .join(''));
  // The error I had was used comma intead of blank as of now
};
generateShop();

// Selecting the plus and minus button
const addBtn = document.querySelectorAll('.add');
const removeBtn = document.querySelectorAll('.remove');

// Cart Notification Badge
const badge = document.getElementById('badge');

// Cart Container
const cartContainer = document.getElementById('cart');

let total,
  totalCartValue = 0;

const updateCart = function (product) {
  // let id = document.querySelector(`#${product.id}`);

  const search = cart.find((x) => x.id === product.id);

  if (search === undefined) {
    product.querySelector('.quantity').textContent = 0;
  } else {
    product.querySelector('.quantity').textContent = search.quantity;
  }

  if (cart.length >= 1) {
    total = cart.map((x) => x.quantity).reduce((acc, cur) => acc + cur);
    totalCartValue = totalValue();
  } else {
    total = 0;
    totalCartValue = 0;
  }

  if (total !== 0) {
    badge.classList.remove('hide');

    badge.textContent = total;
  } else {
    badge.textContent = total;

    badge.classList.add('hide');
  }

  if (total > 0) {
    generateCart();
  } else {
    emptyCart();
  }
};

// Decrementing the fruit
let increment = function (e) {
  // Capturing the ID of the clicked button
  let selectedItem = e.target.parentElement;
  let selectedItemName = selectedItem.querySelector('.card-title').textContent;

  let search = cart.find((el) => el.id === selectedItem.id);
  let searchPrice = totalItems.find((el) => el.id === selectedItem.id).price;
  let searchUrl = totalItems.find((el) => el.id === selectedItem.id).imgSource;

  if (search === undefined) {
    cart.push({
      id: selectedItem.id,
      item: selectedItemName,
      quantity: 1,
      price: searchPrice,
      url: searchUrl,
    });
  } else {
    search.quantity++;
  }

  updateCart(selectedItem);
};

// Incrementing the fruit
let decrement = function (e) {
  let selectedItem = e.target.parentElement;

  let search = cart.find((el) => el.id === selectedItem.id);

  if (cart.includes(search)) {
    search.quantity--;
    if (search.quantity === 0) {
      let index = cart.indexOf(search);
      if (index !== -1) {
        cart.splice(index, 1);
      }
    }
  } else {
    alert('Product not in Cart');
  }

  updateCart(selectedItem);
};

// Event Listener on both the buttons
addBtn.forEach((el) => el.addEventListener('click', increment));
removeBtn.forEach((el) => el.addEventListener('click', decrement));

// Generating Cart
const generateCart = function () {
  cartContainer.innerHTML =
    cart
      .map(
        (x) => `<li class="list-group-item"><section
    class="item d-flex justify-content-between align-items-center">
    <div>
      <h5>${x.item}</h5>
      <ul class="ps-0">
        <li class="list-group-item fs-6">
          Quantity: ${x.quantity}
        </li>
        <li class="list-group-item fs-6">
          Price: ₹${x.quantity * x.price}
        </li>
      </ul>
    </div>
    <div>
      <img src="Images/${x.url}" alt="item" width="100" />
    </div>
  </section></li>`
      )
      .join('') +
    `<section class="total-cart-value d-flex justify-content-between"><p>Total Price:</p><span id="finalBill" class="fw-bold fs-5">₹ ${totalCartValue}</span></section>`;
};

// Empty Cart Value
const emptyCart = function () {
  cartContainer.innerHTML = 'There are no Items in the cart';
};

// Total Cart Value
const totalValue = function () {
  return cart.map((x) => x.price * x.quantity).reduce((acc, cur) => acc + cur);
};
