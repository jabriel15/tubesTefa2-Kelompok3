
// Validation Id VIP
function validate() {
    var novip=document.forms['form']['novip'];
    if(novip.value.length != 6) {
        alert("Id yang kamu masukkan salah!");
        return false;
    }
    else {
        alert("Welcome VIP")
    }
}

// Fungsi cart
let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Mie Goreng',
        tag: 'miegoreng',
        price: 17000,
        inCart: 0
    },
    {
        name: 'Mie Kuah',
        tag: 'miekuah',
        price: 19000,
        inCart: 0
    },
    {
        name: 'Iced Coffeemilk',
        tag: 'icedcoffee',
        price: 13500,
        inCart: 0
    },
    {
        name: 'Americano',
        tag: 'americano',
        price: 17000,
        inCart: 0
    }
]

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

// mengecek item di local storage
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

// Nomor di cart
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null ) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// Total harga per item
function totalCost(product) {
    // console.log("Harganya adalah", product.price);
    let cartCost = localStorage.getItem('totalCost');

    console.log("My CartCost Is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost)
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

// Display di popup 
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let containerProduct = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if(cartItems && containerProduct ) {
        containerProduct.innerHTML = '';
        Object.values(cartItems).map(item => {
            containerProduct.innerHTML += `
            <div class="product">${item.name}</div>
            <div class="price">Rp.${item.price}</div>
            <div class="quantity">${item.inCart}</div>
            <div class="total">Rp.${item.inCart * item.price}</div>
            `
        });

        containerProduct.innerHTML += `
            <div class="cartTotalContainer">
                <p class="cartTotalTitle">
                    Total Price:
                </p>
                <p class="cartTotal">
                    Rp.${cartCost}
                </p>
        `

    }
}

function hapus(){
    localStorage.clear();
    location.reload();
}

function bayar() {
    alert("Payment Success")
    localStorage.clear();
    location.reload();
}


onLoadCartNumbers();
displayCart();