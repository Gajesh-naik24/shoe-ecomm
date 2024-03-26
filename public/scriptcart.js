'use strict';
const payAmountBtn = document.querySelector('#payAmount');
const decrementBtn = document.querySelectorAll('#decrement');
const quantityElem = document.querySelectorAll('#quantity');
const incrementBtn = document.querySelectorAll('#increment');
const priceElem = document.querySelectorAll('#price');
const subtotalElem = document.querySelector('#subtotal');
const taxElem = document.querySelector('#tax');
const totalElem = document.querySelector('#total');

let total = 0;
for (let i = 0; i < incrementBtn.length; i++) {

  incrementBtn[i].addEventListener('click', function () {
    let increment = Number(this.previousElementSibling.textContent);
    increment++;
    this.previousElementSibling.textContent = increment;

    totalCalc();

  });


  decrementBtn[i].addEventListener('click', function () {
    let decrement = Number(this.nextElementSibling.textContent);
    decrement <= 1 ? 1 : decrement--;
    this.nextElementSibling.textContent = decrement;

    totalCalc();

  });

}
const totalCalc = function () {
  const tax = 0.05;
  let subtotal = 0;
  let totalTax = 0;
  console.log(priceElem[0].textContent)
    subtotal += Number(quantityElem[0].textContent) * Number(priceElem[0].textContent);

  subtotalElem.textContent = subtotal.toFixed(2);
  totalTax = subtotal * tax;
  taxElem.textContent = totalTax.toFixed(2);
  total = subtotal + totalTax;
  totalElem.textContent = total.toFixed(2);
  payAmountBtn.textContent = total.toFixed(2);

  

}
totalCalc()

const pname = new URLSearchParams(window.location.search).get('name');
console.log(pname)
const price = new URLSearchParams(window.location.search).get('price');
const imageLink = new URLSearchParams(window.location.search).get('image');
document.getElementById("product-name").innerHTML = `${pname}`
document.getElementById("price").innerHTML = `${price}`
document.getElementById("imageTag").src = "/image/" +imageLink;

    console.log(parseInt(price));
    subtotalElem.textContent = price;
    let totalTax = price * 0.1;
    taxElem.textContent = totalTax.toFixed(2);
    total = parseInt(price) + parseInt(totalTax);
    totalElem.textContent = total;
    payAmountBtn.textContent = total;

function btnGone() {
  document.getElementById('productcard').style.display = 'none';
}

function btnGone2() {
  document.getElementById('productcard2').style.display = 'none';
}
