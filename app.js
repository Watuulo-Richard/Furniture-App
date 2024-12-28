const productsContainer = document.querySelector('.products-container')
const API = 'https://fakestoreapi.com/products'

// showing a spinner
document.addEventListener('DOMContentLoaded', ()=>{
    const spinnerLoader = document.querySelector('.loading')
    const mainContainer = document.querySelector('.container')
    spinnerLoader.classList.remove('hidden')
    mainContainer.classList.add('hidden')
})

//remove spinner
window.addEventListener('load', ()=>{
    const spinnerLoader = document.querySelector('.loading')
    const mainContainer = document.querySelector('.container')
    setTimeout(()=>{
        spinnerLoader.style.display = 'none'
        mainContainer.classList.remove('hidden')
    }, 5000)
})
async function fetchProducts() {
    const response = await fetch(API)
    const fetchedProducts = await response.json()
    console.log(fetchedProducts)
    displayFetchedProductsOnUI(fetchedProducts)
}

fetchProducts()

function displayFetchedProductsOnUI(data){
    productsContainer.innerHTML = ''
    data.map((productItem)=>{
        const productsTemplate = `
            <a href="./productDetails.html?id=${productItem.id}" class="product-card">
                <div class="product-card-image-container">
                    <img src="${productItem.image}" alt="${productItem.title}">
                </div>
                <div class="product-card-text">
                    <p class="product-name line-clamp">${productItem.title}</p>
                    <p class="product-price">$${productItem.price}</p>
                </div>
            </a>
        `
        productsContainer.insertAdjacentHTML('beforeend', productsTemplate)
    })
}

const productsLinkBtn = document.querySelector('.products-container')
