'use strict';

// Price list of all the items
const priceList = {
  apple: 50,
  banana: 20,
  orange: 30,
  pear: 40,
};

// Shopping Cart
const cart = { items: [] };

// Capturing the price DOM tag
const applePrice = document.querySelector('.apple .pricing');
const bananaPrice = document.querySelector('.banana .pricing');
const orangePrice = document.querySelector('.orange .pricing');
const pearPrice = document.querySelector('.pear .pricing');

// Assgining the prices
const apple = (applePrice.textContent = priceList.apple);
const banana = (bananaPrice.textContent = priceList.banana);
const orange = (orangePrice.textContent = priceList.orange);
const pear = (pearPrice.textContent = priceList.pear);

const add = function () {};

const updateItems = function () {
  const numApple = cart.items.filter((fruit) => fruit === 'Apple').length;
  const appleTotal = numApple * apple;
  // console.log(appleTotal);
  const numBanana = cart.items.filter((fruit) => fruit === 'Banana').length;
  const bananaTotal = numBanana * banana;
  // console.log(bananaTotal);
  const numOrange = cart.items.filter((fruit) => fruit === 'Orange').length;
  const orangeTotal = numOrange * orange;
  // console.log(orangeTotal);
  const numPear = cart.items.filter((fruit) => fruit === 'Pear').length;
  const pearTotal = numPear * pear;
  // console.log(pearTotal);

  total = appleTotal + bananaTotal + orangeTotal + pearTotal;
  console.log(total);
};

let total, addItem, removeItem;

document.querySelectorAll('.add').forEach((el) =>
  el.addEventListener('click', function (e) {
    e.preventDefault();
    addItem = e.target.parentElement.querySelector('.card-title').textContent;
    cart.items.push(addItem);
    console.log(cart.items);
    updateItems();
  })
);

document.querySelectorAll('.remove').forEach((el) =>
  el.addEventListener('click', function (e) {
    e.preventDefault();

    if (cart.items.length === 0) alert('Cart is already Empty!');
    else {
      const removeItem =
        e.target.parentElement.querySelector('.card-title').textContent;
      const removeIndex = cart.items.indexOf(removeItem);
      cart.items.splice(removeIndex, 1);
      console.log(cart.items);
      updateItems();
    }
  })
);
