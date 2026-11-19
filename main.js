
const products = [
    {
        id: 1,
        name: "iPhone 17 Pro Max",
        brand: "Apple",
        price: 1199,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500"
    },
    {
        id: 2,
        name: "iPhone 16 Pro",
        brand: "Apple",
        price: 999,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
    },
    {
        id: 3,
        name: "Samsung Galaxy S25 Ultra",
        brand: "Samsung",
        price: 1099,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500"
    },
    {
        id: 4,
        name: "Samsung Galaxy Z Flip",
        brand: "Samsung",
        price: 899,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"
    },
    {
        id: 5,
        name: "Google Pixel 10 Pro",
        brand: "Google",
        price: 999,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"
    },
    {
        id: 6,
        name: "iPhone 15",
        brand: "Apple",
        price: 699,
        image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500"
    },
    {
        id: 7,
        name: "Samsung Galaxy S24",
        brand: "Samsung",
        price: 799,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    },
    {
        id: 8,
        name: "Google Pixel 9",
        brand: "Google",
        price: 699,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    }
];

let cart = [];

function displayProducts() {
    const list = document.getElementById("product-list");
    const search = document.getElementById("search").value.toLowerCase();
    const category = document.getElementById("category").value;

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search) &&
        (category === "All" || p.brand === category)
    );

    list.innerHTML = filtered.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">$${p.price.toLocaleString()}</p>
            <button class="add-btn" onclick="addToCart(${p.id})">
                Add to Cart +
            </button>
        </div>
    `).join("");

    if (filtered.length === 0) {
        list.innerHTML = "<p>No products found.</p>";
    }
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

function updateCart() {
    document.getElementById("cart-count").textContent =
        cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById("cart-items").innerHTML =
        cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>$${item.price} × ${item.quantity}</p>
                </div>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("total").textContent = total.toLocaleString();
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("active");
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for shopping at PHONE HUB!");
    cart = [];
    updateCart();
    toggleCart();
}

displayProducts();
