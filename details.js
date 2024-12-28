const detailsSectionContainer = document.querySelector('.details-section')

// showing a spinner
document.addEventListener('DOMContentLoaded', ()=>{
    const spinnerLoader = document.querySelector('.loading')
    const mainContainer = document.querySelector('.details-container')
    spinnerLoader.classList.remove('hidden')
    mainContainer.classList.add('hidden')
})

//remove spinner
window.addEventListener('load', ()=>{
    const spinnerLoader = document.querySelector('.loading')
    const mainContainer = document.querySelector('.details-container')
    setTimeout(()=>{
        spinnerLoader.style.display = 'none'
        mainContainer.classList.remove('hidden')
    }, 5000)
})

let cartArray = JSON.parse(localStorage.getItem('key')) || []
async function fetchSingleProductData() {
    const productId = new URLSearchParams(window.location.search).get('id')
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
    const singleFetchedProduct = await response.json()
    console.log(productId, singleFetchedProduct)
    displaySingleFetchedProductOnUI(singleFetchedProduct)
}

fetchSingleProductData()

function displaySingleFetchedProductOnUI(product) {
    detailsSectionContainer.innerHTML = ''
    const detailsSingleFetchedProductTemplate = `
        <div class="left-detail-side">
            <a href="./index.html" class="back-home">
                <i class="fa-solid fa-arrow-left"></i>
                Back
            </a>
            <div class="detail-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
        </div>
        <div class="right-detail-side">
            <div class="detail-heading">
                <div class="heading-text">
                    <h3>${product.category}</h3>
                    <p>1 pc(s)</p>
                    <p>${product.description}</p>
                </div>
                <button type="button" id="likeBtn" class="likeBtn">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
            <div class="detail-price">
                <h2>$${product.price}</h2>
            </div>
            <div class="detail-addToCart">
                <button type="button" class="btn addToCartBtn" id="addToCartBtn" onclick="addItem('${product.title}', '${product.image}', '${product.price}', '${product.id}')" >Add To Shopping Cart</button>
                <p class="available-stock">30 pieces available</p>
            </div>
            <hr class="border-line">
            <div class="detail-product-categories">
                <p class="category-heading">Categories</p>
                <button type="button" class="bedBtn">bed</button>
                <button type="button" class="bedBtn">master bed</button>
            </div>
            <div class="detail-productSellers-link">
                <p class="sellersHeading">
                    Sellers
                </p>
                <a href="#" class="sellersLink">Furniture Shop</a>
            </div>
        </div>
    `
    detailsSectionContainer.insertAdjacentHTML('beforeend', detailsSingleFetchedProductTemplate)

    const modal = document.getElementById('modal-section')
    const addToCartBtn = document.getElementById('addToCartBtn')
    const closeBtn = document.getElementById('closeBtn')
    

    addToCartBtn.addEventListener('click', openModal)
    console.log(addToCartBtn, 'clicked')

    closeBtn.addEventListener('click', closeModal)
    console.log(addToCartBtn, 'closed')

    function openModal(){
        modal.style.display = 'block'
    }

    function closeModal() {
        modal.style.display = 'none'
    }

    // window.addEventListener('click', clickOutside)
    // console.log(window, 'clicked outside')

    // function clickOutside(e){
    //     if(e.target == modal){
    //         modal.style.display = 'none'
    //     }
    // }

}

function addItem(title, image, price, id){
    console.log(title, image, price, id)
    id = Number(id)
    const newObject = {
        image: image,
        name: title,
        price: price,
        id: id,
    }
    cartArray.push(newObject)
    displayAddToCartItemsOnUI(cartArray)
    localStorage.setItem('key', JSON.stringify(cartArray))
    console.log(cartArray)
    // calculateTotal()
}

function displayAddToCartItemsOnUI(data){
    const addToCartContainer = document.querySelector('.modal-card-container')
    addToCartContainer.innerHTML = ''
    data.forEach((item)=>{
        const addToCartTemplate = `
            <div class="modal-card">
                <div class="modal-card-img">
                    <img src="${item.image}" alt="">
                </div>
                <div class="modal-card-text">
                    <p class="modal-price">$${item.price}</p>
                    <p class="modal-stock-left">30pcs</p>
                </div>
            </div>
        `
        addToCartContainer.insertAdjacentHTML('beforeend', addToCartTemplate)
        // calculateTotal()
    })
}

// const total = document.querySelector('.total')

// function calculateTotal(){
//     let totalPrice = 0
//     cartArray.forEach((item)=>{
//         totalPrice += parseFloat(item.price)
//     })
//     total.textContent = `Total Amount: $${totalPrice}`
// }