// load cart data from localStorage, returns an empty array if data is invalid
export function loadLocalCart() {
    if (typeof window === "undefined") return [];
    try {
        return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
        return [];
    }
}

// save the provided cart array to localStorage
export function saveLocalCart(cart) {
    if (typeof window === "undefined") return;
    localStorage.setItem("cart", JSON.stringify(cart));
}

// add product to local UI cart cache
export function addToLocalCart(product) {
    const cart = loadLocalCart();
    cart.push(product);
    saveLocalCart(cart);
    alert("Item added to cart!");
}

// remove product from local UI cart cache by ID
export function removeFromLocalCart(id) {
    let cart = loadLocalCart();
    cart = cart.filter((item) => item._id !== id);
    saveLocalCart(cart);
}