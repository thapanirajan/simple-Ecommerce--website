//Star review Hover
let stars = document.querySelectorAll(".stars");

//Creating loop to get stars from each product
stars.forEach(icon => {
    //Converting the nodelist to array 
    let arr = Array.from(icon.children);
    //running the loop for all the stars in the product 
    arr.forEach((star, index) => {
        //event listener to  detect action in our website
        star.addEventListener('mouseover', () => {
            //changing tha color of stars while hover
            for (let i = 0; i <= index; i++) {
                arr[i].src = '../images/icons/star_after.png';
            }
        }
        );
        //mouseout help us know when the user has removed the cursor
        star.addEventListener('mouseout', () => {
            for (let i = 0; i <= index; i++) {
                arr[i].style.transition = "0.2s";
                arr[i].src = '../images/icons/star.png';
            }
        }
        )
    })

});

function hideProduct() {
    //selecting the products with the product class 
    let product = document.querySelectorAll(".product");
    //Hiding all the products
    for (let i = 0; i < product.length; i++) {
        product[i].style.display = "none";
    }
}

//Creating functions to show products by passing category as parameter
let arrange = (category) => {
    //calling hide products to hide the product
    hideProduct();
    //Changing the title of the page
    let title = document.getElementById("title");
    title.innerText = "Latest products";
    //selecting the products with latest class only
    let latest = document.querySelectorAll(category);
    //displaying the products with latest class
    latest.forEach(latest_product => {
        latest_product.style.display = "block";
    })
}

//Add to cart
let displayCart = (cartDisplay) => {
    cartDisplay.style.visibility = 'visible';
    cartDisplay.style.width = '400px';
    cartDisplay.style.transitionDuration = '0.3s';
    cartDisplay.style.zIndex = '1';
}

//this function creates a div tad
let createDiv = () => {
    let productContainer = document.createElement('div');
    productContainer.style.display = 'flex';
    return productContainer;
}

//Create a img tag set the src and return image as a node
let createImage = (product) => {
    let productImage = product.children[0].children[0];
    let imageSource = productImage.getAttribute('src');
    cartImage = document.createElement('img');
    cartImage.setAttribute('src', imageSource);
    cartImage.style.width = '150px'
    return cartImage;
}

//Creates a h2 tag, add the title and then returns it
let createTitle = (product) => {

    let productName = product.children[1].children[0].children[0].innerText;
    productTitle = document.createElement('h2');
    productTitle.innerText = productName;
    productTitle.style.height = '1.75rem';
    productTitle.style.overflow = 'hidden';
    return productTitle;
}

//This function creates a paragraph tag and retun it.
let createPrice = (productPrice) => {
    cartPrice = document.createElement('p');
    cartPrice.innerText = 'Price:$' + productPrice;
    cartPrice.style.marginTop = '80px';
    return cartPrice;
}

let totalPayment = document.getElementById("total_price");
let total = 0;
//This function calculates the total price added
let calcTotal = (productPrice) => {
    total = total + Number(productPrice);
    totalPayment.innerText = '$' + total;
    totalPayment.style.fontWeight = 'bold';
    localStorage.setItem('total', total);
}

//this function is used to create the p tag quantity and return it.
let createQuantity = () => {
    let quantity = document.createElement('p');
    quantity.innerText = 'Quantity:';
    return quantity;
}

//used to write the amount of quantity of product 
let createQuantityAmount = () => {
    let num = document.createElement('span');
    num.innerText = 1;
    return num;
}

//adds the quantity every time a product is added
let increaseQuantity = (index, itemContainer) => {
    let repeat = Number(itemContainer.children[index].children[1].children[1].children[1].innerText);
    itemContainer.children[index].children[1].children[1].children[1].innerText = repeat + 1;
}

//Creating the remove button
let createRemove = () => {
    removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'remove_button');
    removeButton.innerText = 'Remove';
    removeButton.style.position = 'relative';
    removeButton.style.left = '165px';
    removeButton.style.bottom = '17px';
    removeButton.style.fontSize = '1rem';
    removeButton.style.backgroundColor = 'white';
    removeButton.style.border = 'none';
    removeButton.style.textDecoration = 'underline';
    return removeButton;
}

//This function wraps all the div and the components
let combineCart = (product, itemContainer) => {
    //Create 2 different div 
    productContainer = createDiv();
    itemContainer.append(productContainer);
    productDescription = createDiv();
    //adding the image and the description to the parent div
    productContainer.append(createImage(product));
    productContainer.append(productDescription);
    //adding the title and the price to the child div
    productDescription.style.display = 'block';
    productContainer.style.backgroundColor = 'white';
    productContainer.style.border = '1px solid black';
    productDescription.append(createTitle(product));
    let numberProducts = createDiv();

    productDescription.append(numberProducts);
    numberProducts.append(createQuantity());
    numberProducts.append(createQuantityAmount());
    let price = product.children[1].children[0].children[1].children[1].innerText;
    productDescription.append(createPrice(price));
    productDescription.append(createRemove());
    calcTotal(price);
}

//this function checks if the product should be addded or the quantity should be increased
let checkQuantity = (indexList, index, itemContainer) => {
    for (let i = 0; i < indexList.length; i++) {
        if (indexList[i] === index) {
            let postion = i;
            increaseQuantity(postion, itemContainer);
            return false;
        }
    }
    return true;

}

//this function reduces the total when remove function is called
let reduceTotal = (btnParent) => {
    let qn = btnParent.children[1].children[1].lastChild.innerText;
    let priceText = btnParent.children[1].children[2].innerText;
    let price = priceText.substr(7);
    return -Number(qn) * Number(price);
}

//Adding and Displaying the products 
function addToCart() {
    //getting the location of cart display
    const cartDisplay = document.querySelector('.cart_display');
    const itemContainer = document.querySelector('.item_container');
    const layoutCart = document.querySelector('.layout_cart');
    //making sure the product page is hidden when the cart is called
    layoutCart.addEventListener('click', () => {
        if (productLayout.style.visibility === 'visible') {
            productLayout.style.visibility = 'hidden';
        }
        displayCart(cartDisplay);
    })

    let carts = document.querySelectorAll(".add_to_cart");
    let indexList = [];
    let productLayout = document.querySelector('.product_layout');
    //loop for all the add to cart button
    carts.forEach((cart, index) => {
        cart.addEventListener('click', () => {
            //shop now also has add to cart class so making sure it is not repeated
            if (index % 2 != 0) {
                index -= 1;
            }
            //hiding the product page if it is visible 
            if (productLayout.style.visibility === 'visible') {
                productLayout.style.visibility = 'hidden';
            }

            //Displaying the cart
            displayCart(cartDisplay);
            let product = cart.parentNode.parentNode;
            //checking if the product is already in the cart
            if (checkQuantity(indexList, index, itemContainer)) {
                combineCart(product, itemContainer);
                indexList.push(index);
            }
            else {
                let price = product.children[1].children[0].children[1].children[1].innerText;
                calcTotal(price);
            }
            //getting the remove button 
            let removeBtn = document.querySelectorAll('.remove_button');
            //checking for each button 
            removeBtn.forEach(btn => {
                //chekcing if it is clicked
                btn.addEventListener('click', () => {
                    //getting the the product section 
                    let btnParent = btn.parentNode.parentNode;
                    let headParent = btnParent.parentNode;
                    //making sure there is parent 
                    if (headParent != null) {
                        //converting the class list into array to find the index of the section
                        let recycle = Array.from(headParent).indexOf(btnParent);
                        //deleting the section
                        btnParent.remove();
                        //removing it from the indexList
                        indexList.splice(recycle, 1);
                        //calling the function to reduce the total
                        calcTotal(reduceTotal(btnParent));
                    }
                })
            })

        });
    });;
    close(cartDisplay, 'close_cart');
    shop(cartDisplay, productLayout);
}

//close function closes the display of cart or product details as per parameters
function close(cartDisplay, id) {
    let close = document.getElementById(id);
    let main = document.getElementById('main');
    close.addEventListener('click', () => {
        cartDisplay.style.transitionDuration = '0s';
        cartDisplay.style.visibility = 'hidden';
        cartDisplay.style.width = '0%';
        main.style.filter = 'blur(0)';
    });
}

//Used to add the quantity in product display
function addQuantity(qn) {

    let qnBtn = document.getElementById('plus');
    qnBtn.addEventListener('click', () => {
        let qnPrevious = Number(qn.innerText);
        qn.innerText = qnPrevious + 1;
    })

}

//used to subtract the quantity in product display
function subQuantity(qn) {
    let qnBtn = document.getElementById('minus');
    qnBtn.addEventListener('click', () => {
        let qnPrevious = Number(qn.innerText);
        if (qnPrevious > 1) {
            qn.innerText = qnPrevious - 1;
        }

    })
}

//This function combines the add and subtract function
function calcQuantity() {

    let qn = document.getElementById('quantity_number');
    addQuantity(qn);
    subQuantity(qn);
}

//displays the sale timer
const setTimer = () => {

    let time = 0;
    let timeSeconds = time * 60;
    let minute = document.getElementById('minutes');
    let second = document.getElementById('seconds');
    let hour = document.getElementById('hour');
    //It changes the timer display 
    function changeTime() {
        let minutes = Math.trunc(timeSeconds / 60);
        let seconds = timeSeconds % 60;

        minute.innerText = minutes < 10 ? '0' + minutes : minutes;
        second.innerText = seconds < 10 ? '0' + seconds : seconds;

        if (timeSeconds > 0) {
            timeSeconds--;
        }
        if (minutes == 0 && seconds == 0) {

            let hours = Number(hour.innerText);
            if (hours > 0) {
                hour.innerText = '0' + hours - 1;
            }

            timeSeconds = 60 * 60;
        }

    }
    //set interval calls the function every second 
    setInterval(changeTime, 1000);
}

//displays the product decription 
let shop = (cartDisplay, productLayout) => {
    //selecting all the buttons with shop class
    let shopList = document.querySelectorAll('.shop');
    //getting the postions of all the derails
    let layoutImage = document.getElementById('layout_image');
    let layoutTitle = document.querySelector('.layout_title');
    let layoutPrice = document.querySelector('.layout_price');

    //running loop for each of the button
    shopList.forEach((shopNow) => {
        //checking if the button is clicked
        shopNow.addEventListener('click', () => {
            let main = document.getElementById('main');
            main.style.filter = "blur(2px)";

            //getting the details of the image
            let parentShop = shopNow.parentNode.parentNode;
            let childImage = parentShop.children[0].children[0];
            layoutImage.setAttribute('src', childImage.getAttribute('src'));
            //getting the price and the product name 
            let childDesc = parentShop.children[1].children[0];
            layoutTitle.innerText = childDesc.children[0].innerText;
            layoutPrice.innerText = '$' + childDesc.children[1].children[1].innerText;
            //making the product display visible
            productLayout.style.width = '70%';
            productLayout.style.visibility = 'visible';
            //closing the cart if open
            cartDisplay.style.visibility = 'hidden';
            cartDisplay.style.width = 0;
        })
    })
    close(productLayout, 'close_product')
}

let productLayoutDesc = () => {
    let close = document.getElementById('close_desc');
    let desc = document.getElementById('layout_about');
    close.addEventListener('click', () => {
        if (desc.style.display != 'block') {
            desc.style.display = 'block';
        }
        else {
            desc.style.display = 'none';
        }
    })
}


productLayoutDesc();
addToCart();
calcQuantity();
setTimer();
