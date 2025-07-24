let currentUser = '';
let cartItems = [];

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === 'user@gmail.com' && password === '1234') {
    currentUser = email;
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('shopItems').style.display = 'grid';
    document.getElementById('cartSummary').style.display = 'block';
    loadProducts();
    loadCartFromStorage();
  } else {
    alert('Invalid credentials!');
  }
}

function loadProducts() {
  const container = document.getElementById('shopItems');
  container.innerHTML = '';
  products.forEach(p => {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>Price: ₹${p.price}</p>
      <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
    `;
    container.appendChild(item);
  });
}

function addToCart(itemName, price) {
  cartItems.push({ name: itemName, price });
  saveCartToStorage();
  updateCartUI();
  document.getElementById('cartMsg').innerText = `📩 ${currentUser} selected ${itemName}`;
  setTimeout(() => {
    document.getElementById('cartMsg').innerText = '';
  }, 2000);
}

function updateCartUI() {
  const list = document.getElementById('cartList');
  list.innerHTML = '';
  let total = 0;

  cartItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `🛍 ${item.name} - ₹${item.price} 
      <button onclick="removeItem(${index})" style="margin-left:10px; background:red; color:white; border:none; padding:4px 8px; border-radius:4px;">Remove</button>`;
    list.appendChild(li);
    total += item.price;
  });

  document.getElementById('totalPrice').innerText = `Total: ₹${total}`;
}

function removeItem(index) {
  cartItems.splice(index, 1);
  saveCartToStorage();
  updateCartUI();
}

function saveCartToStorage() {
  localStorage.setItem('myCart', JSON.stringify(cartItems));
}

function loadCartFromStorage() {
  const savedCart = localStorage.getItem('myCart');
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
    updateCartUI();
  }
}

function checkout() {
  alert(`🛍 Thank you, ${currentUser}! Checkout not implemented yet.`);
}

const products = [
  { name: 'Sunglasses', price: 299, image: 'images/sunglasses.jpg' },
  { name: 'Leather Belt', price: 399, image: 'images/belt.jpg' },
  { name: 'Hoodie', price: 899, image: 'images/hoodie.jpg' },
  { name: 'Formal Shirt', price: 599, image: 'images/formalshirt.jpg' },
  { name: 'Sports Shorts', price: 349, image: 'images/shorts.jpg' },
  { name: 'Wrist Watch', price: 1199, image: 'images/watch.jpg' },
  { name: 'Backpack', price: 799, image: 'images/backpack.jpg' },
  { name: 'Perfume', price: 699, image: 'images/perfume.jpg' },
  { name: 'Scarf', price: 249, image: 'images/scarf.jpg' },
  { name: 'Woolen Gloves', price: 299, image: 'images/gloves.jpg' }
];

let cart = [];
let userEmail = "";

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === 'user@gmail.com' && password === '1234') {
    userEmail = email;
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('shopItems').style.display = 'grid';
    document.getElementById('viewCartBtn').style.display = 'block';
    loadProducts();
  } else {
    alert('Invalid credentials!');
  }
}

function loadProducts() {
  const container = document.getElementById('shopItems');
  container.innerHTML = '';
  products.forEach(p => {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>Price: ₹${p.price}</p>
      <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
    `;
    container.appendChild(item);
  });
}

function addToCart(itemName, price) {
  cart.push({ name: itemName, price: price });
  document.getElementById('cartMsg').innerText = `${itemName} added to cart!`;
  setTimeout(() => {
    document.getElementById('cartMsg').innerText = '';
  }, 1500);
}

function viewCart() {
  const cartData = encodeURIComponent(JSON.stringify(cart));
  window.open(`cart.html?email=${encodeURIComponent(userEmail)}&cart=${cartData}`, '_blank');
}